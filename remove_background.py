#!/usr/bin/env python3
"""
배경 제거 스크립트
image1.png의 연한 보라색 배경을 투명하게 만듭니다.
"""

from PIL import Image
import numpy as np

def remove_background(input_path, output_path, tolerance=30):
    """
    이미지의 배경을 투명하게 만듭니다.
    
    Args:
        input_path: 입력 이미지 경로
        output_path: 출력 이미지 경로
        tolerance: 배경색 감지 허용 오차
    """
    # 이미지 열기
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # 배경색 추출 (좌상단 모서리 색상을 배경으로 가정)
    bg_color = data[0, 0][:3]  # RGB 값만 사용
    
    # 각 픽셀에 대해 배경색과 비교
    rgb = data[:, :, :3]
    
    # 배경색과의 차이 계산
    diff = np.abs(rgb - bg_color)
    mask = np.all(diff <= tolerance, axis=2)
    
    # 알파 채널 설정
    data[:, :, 3] = np.where(mask, 0, 255)
    
    # 가장자리 부드럽게 처리
    for y in range(1, data.shape[0] - 1):
        for x in range(1, data.shape[1] - 1):
            if data[y, x, 3] == 255:  # 불투명 픽셀
                # 주변에 투명 픽셀이 있으면 반투명 처리
                neighbors = [
                    data[y-1, x, 3], data[y+1, x, 3],
                    data[y, x-1, 3], data[y, x+1, 3]
                ]
                if 0 in neighbors:
                    # 가장자리 안티앨리어싱
                    rgb_diff = np.mean(diff[y, x])
                    if rgb_diff < tolerance * 1.5:
                        data[y, x, 3] = int(255 * (rgb_diff / (tolerance * 1.5)))
    
    # 새 이미지 생성 및 저장
    new_img = Image.fromarray(data, "RGBA")
    new_img.save(output_path, "PNG")
    print(f"✅ 배경이 제거된 이미지가 저장되었습니다: {output_path}")

if __name__ == "__main__":
    input_file = "/Users/sunghyunkim/Downloads/image1.png"
    output_file = "/Users/sunghyunkim/Desktop/UnfinishedVault_LandingPage/icon_transparent.png"
    
    try:
        remove_background(input_file, output_file, tolerance=40)
        print("🎨 미완성수집소 아이콘 배경 제거 완료!")
    except Exception as e:
        print(f"❌ 오류 발생: {e}")