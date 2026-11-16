import os
import re
import sys
import json
import urllib.request
import urllib.parse
import yt_dlp

def clean_url_str(s):
    if not s:
        return None
    return s.replace('\\/', '/').replace('&amp;', '&').replace('\\u0025', '%')

def format_duration(seconds):
    if not seconds:
        return ""
    m, s = divmod(int(seconds), 60)
    h, m = divmod(m, 60)
    if h > 0:
        return f"{h:02d}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"

def format_bytes(bytes_num):
    if not bytes_num:
        return ""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if bytes_num < 1024.0:
            return f"{bytes_num:.1f} {unit}"
        bytes_num /= 1024.0
    return f"{bytes_num:.1f} TB"

def resolve_final_url(url):
    """
    Follows redirects for shortened FB links (e.g. fb.watch or facebook.com/share/r/...)
    """
    try:
        req = urllib.request.Request(
            url,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
            }
        )
        with urllib.request.urlopen(req, timeout=8) as resp:
            return resp.geturl()
    except Exception:
        return url

def direct_html_scrape(url):
    """
    Direct HTML fallback extractor if yt-dlp encounters restrictions or bot checks.
    Scrapes high definition and standard definition video URLs directly from page source.
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none'
    }

    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as response:
            html = response.read().decode('utf-8', errors='ignore')
    except Exception:
        return None

    # Search for HD video URLs
    hd_match = re.search(r'["\'](?:browser_native_hd_url|playable_url_quality_hd)["\']\s*:\s*["\']([^"\']+)["\']', html)
    # Search for SD video URLs
    sd_match = re.search(r'["\'](?:browser_native_sd_url|playable_url)["\']\s*:\s*["\']([^"\']+)["\']', html)
    
    # Metadata
    title_match = re.search(r'<meta\s+property=["\']og:title["\']\s+content=["\']([^"\']+)["\']', html)
    thumb_match = re.search(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', html)

    hd_url = clean_url_str(hd_match.group(1)) if hd_match else None
    sd_url = clean_url_str(sd_match.group(1)) if sd_match else None
    title = clean_url_str(title_match.group(1)) if title_match else "Facebook Video"
    thumb = clean_url_str(thumb_match.group(1)) if thumb_match else None

    formats = []
    if hd_url:
        formats.append({
            'id': '1080p',
            'label': '1080p / 720p (Full HD)',
            'quality': 'HD',
            'height': 1080,
            'width': 1920,
            'ext': 'mp4',
            'filesize_str': 'Direct HD MP4',
            'url': hd_url,
            'type': 'video'
        })
    if sd_url:
        formats.append({
            'id': '480p',
            'label': '480p / 360p (SD Quality)',
            'quality': 'SD',
            'height': 480,
            'width': 854,
            'ext': 'mp4',
            'filesize_str': 'Direct SD MP4',
            'url': sd_url,
            'type': 'video'
        })

    if formats:
        return {
            'success': True,
            'title': title,
            'thumbnail': thumb,
            'duration': 'Reel / Video',
            'duration_seconds': 0,
            'uploader': 'Facebook Creator',
            'source_url': url,
            'formats': formats
        }
    return None

def extract_facebook_info(url):
    """
    Extracts Facebook video metadata and available quality formats.
    Supports FB Watch, Reels, Posts, Shares, Mobile links.
    """
    url = url.strip()
    if not url.startswith("http://") and not url.startswith("https://"):
        url = "https://" + url

    # Resolve redirects for share/shortened links
    if 'fb.watch' in url or '/share/' in url:
        resolved = resolve_final_url(url)
        if resolved:
            url = resolved

    ydl_opts = {
        'skip_download': True,
        'quiet': True,
        'no_warnings': True,
        'extract_flat': False,
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
        }
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            title = info.get('title') or info.get('description') or 'Facebook Video'
            if len(title) > 80:
                title = title[:80] + '...'
            
            thumbnail = info.get('thumbnail')
            duration = info.get('duration')
            uploader = info.get('uploader') or info.get('channel') or 'Facebook Creator'
            
            formats = info.get('formats', [])
            
            # Categorize qualities
            quality_options = []
            
            # Look for progressive formats first (audio + video combined)
            progressive = [
                f for f in formats 
                if f.get('vcodec') != 'none' and f.get('acodec') != 'none' and f.get('url')
            ]
            
            if not progressive:
                progressive = [f for f in formats if f.get('url')]
            
            def sort_key(f):
                h = f.get('height') or 0
                w = f.get('width') or 0
                note = (f.get('format_note') or '').lower()
                fid = (f.get('format_id') or '').lower()
                bonus = 1000 if 'hd' in note or 'hd' in fid else 0
                return h * 1000 + w + bonus

            progressive.sort(key=sort_key, reverse=True)
            
            seen_resolutions = set()
            
            for f in progressive:
                height = f.get('height')
                width = f.get('width')
                note = f.get('format_note') or ''
                fid = f.get('format_id') or ''
                
                is_hd = 'hd' in note.lower() or 'hd' in fid.lower() or (height and height >= 720)
                
                if height:
                    res_label = f"{height}p"
                    if is_hd and height >= 1080:
                        res_label += " (Full HD)"
                    elif is_hd:
                        res_label += " (HD)"
                    else:
                        res_label += " (SD)"
                elif is_hd:
                    res_label = "HD (High Definition)"
                else:
                    res_label = "SD (Standard Definition)"
                
                norm_key = (height or ('hd' if is_hd else 'sd'))
                if norm_key in seen_resolutions:
                    continue
                seen_resolutions.add(norm_key)
                
                filesize = f.get('filesize') or f.get('filesize_approx')
                size_str = format_bytes(filesize) if filesize else "Direct MP4"
                
                quality_options.append({
                    'id': f.get('format_id') or ('1080p' if is_hd else '480p'),
                    'label': res_label,
                    'quality': 'HD' if is_hd else 'SD',
                    'height': height,
                    'width': width,
                    'ext': f.get('ext') or 'mp4',
                    'filesize': filesize,
                    'filesize_str': size_str,
                    'url': f.get('url'),
                    'type': 'video'
                })
            
            # Check for audio only
            audio_formats = [
                f for f in formats 
                if f.get('vcodec') == 'none' and f.get('acodec') != 'none' and f.get('url')
            ]
            if audio_formats:
                best_audio = audio_formats[-1]
                afilesize = best_audio.get('filesize') or best_audio.get('filesize_approx')
                quality_options.append({
                    'id': 'audio_only',
                    'label': 'Audio Only (MP3/M4A)',
                    'quality': 'Audio',
                    'height': None,
                    'width': None,
                    'ext': 'm4a',
                    'filesize': afilesize,
                    'filesize_str': format_bytes(afilesize) if afilesize else "Audio Stream",
                    'url': best_audio.get('url'),
                    'type': 'audio'
                })

            if quality_options:
                return {
                    'success': True,
                    'title': title,
                    'thumbnail': thumbnail,
                    'duration': format_duration(duration),
                    'duration_seconds': duration,
                    'uploader': uploader,
                    'source_url': url,
                    'formats': quality_options
                }

    except Exception:
        pass

    # Direct fallback scraper
    direct_res = direct_html_scrape(url)
    if direct_res:
        return direct_res

    return {
        'success': False,
        'error': 'Could not extract video streams. Please make sure the video is public (not in a private group or friends-only).'
    }

if __name__ == '__main__':
    if len(sys.argv) > 1:
        res = extract_facebook_info(sys.argv[1])
        print("__FBSAVE_JSON__" + json.dumps(res))
    else:
        print("Facebook extractor engine ready.")
