# 引数で指定されたフォルダが存在しない場合、フォルダを作成する
import os


def createFolder(dirPath):
    if not os.path.exists(dirPath):
        print(dirPath + 'フォルダを作成する')
        os.makedirs(dirPath, exist_ok=True)
    else:
        pass
