#!/usr/bin/env python3
"""
고급 배경 제거 스크립트
둥근 모서리의 앱 아이콘 배경을 완전히 투명하게 만듭니다.
"""

from PIL import Image
import numpy as np

def remove_background_advanced(input_path, output_path):
    """
    둥근 모서리 앱 아이콘의 배경을 투명하게 만듭니다.
    """
    # 이미지 열기
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # 새로운 알파 채널 생성
    height, width = data.shape[:2]
    center_x, center_y = width // 2, height // 2
    
    # 둥근 사각형 마스크 생성 (iOS 앱 아이콘 스타일)
    corner_radius = min(width, height) * 0.22  # iOS 표준 곡률
    
    # 마스크 배열 초기화
    mask = np.zeros((height, width), dtype=bool)
    
    for y in range(height):
        for x in range(width):
            # 모서리 영역 체크
            in_corner_x = x < corner_radius or x > width - corner_radius
            in_corner_y = y < corner_radius or y > height - corner_radius
            
            if in_corner_x and in_corner_y:
                # 모서리에서 가장 가까운 코너 중심 찾기
                if x < corner_radius:
                    cx = corner_radius
                else:
                    cx = width - corner_radius
                
                if y < corner_radius:
                    cy = corner_radius
                else:
                    cy = height - corner_radius
                
                # 거리 계산
                dist = np.sqrt((x - cx) ** 2 + (y - cy) ** 2)
                mask[y, x] = dist <= corner_radius
            else:
                # 중앙 영역
                mask[y, x] = True
    
    # 알파 채널 설정
    data[:, :, 3] = np.where(mask, data[:, :, 3], 0)
    
    # 안티앨리어싱 적용
    for y in range(1, height - 1):
        for x in range(1, width - 1):
            if mask[y, x] and not all([
                mask[y-1, x], mask[y+1, x], 
                mask[y, x-1], mask[y, x+1]
            ]):
                # 가장자리에 부드러운 처리
                data[y, x, 3] = int(data[y, x, 3] * 0.7)
    
    # 배경색 제거 (연한 보라색/회색 제거)
    for y in range(height):
        for x in range(width):
            if mask[y, x]:
                r, g, b, a = data[y, x]
                # 연한 보라색/회색 배경 감지 (RGB 값이 모두 높고 비슷한 경우)
                if r > 230 and g > 230 and b > 240 and abs(r - g) < 20:
                    data[y, x, 3] = 0  # 투명하게
    
    # 새 이미지 생성 및 저장
    new_img = Image.fromarray(data, "RGBA")
    new_img.save(output_path, "PNG")
    print(f"✅ 배경이 완전히 제거된 이미지가 저장되었습니다: {output_path}")

if __name__ == "__main__":
    input_file = "/Users/sunghyunkim/Downloads/image1.png"
    output_file = "/Users/sunghyunkim/Desktop/UnfinishedVault_LandingPage/icon_transparent_final.png"
    
    try:
        remove_background_advanced(input_file, output_file)
        print("🎨 미완성수집소 아이콘 배경 완전 제거 완료!")
        print("📁 파일 위치: icon_transparent_final.png")
    except Exception as e:
        print(f"❌ 오류 발생: {e}")