# encoding:utf-8
import os
os.system("pip install chardet")
import chardet
import sys


class TextDetect:
    path_root = ''
    file_pattern = ''

    def __init__(self, path_root, file_pattern):
        self.path_root = path_root
        self.file_pattern = file_pattern

    def convert(self, file, in_enc="GBK", out_enc="UTF-8"):
        """
        该程序用于将目录下的文件从指定格式转换到指定格式，默认的是GBK转到utf-8
        :param file:    文件路径
        :param in_enc:  输入文件格式
        :param out_enc: 输出文件格式
        :return:
        """
        in_enc = in_enc.upper()
        out_enc = out_enc.upper()
        try:
            with open(file, mode='r', encoding=in_enc, errors='ignore') as f:
                new_content = f.read()
            with open(file, mode='w', encoding=out_enc) as fw:
                fw.write(new_content)
            print("convert [ " + file.split('\\')[-1] + " ] From " + in_enc + " --> " + out_enc + " successfully")
        except IOError as err:
            print(f"I/O error: {err}")

    def detect(self, out_enc="UTF-8"):
        for root, dirs, files in os.walk(self.path_root, topdown=False):
            for item in files:
                # match = re.match(self.file_pattern, item, re.IGNORECASE)
                is_ts_file = item.endswith(".ts")
                if not is_ts_file:
                    continue
                ts_file_path = os.path.join(root, item)
                if os.path.getsize(ts_file_path) == 0:
                    continue
                print("find file name = %s" % item)
                with open(ts_file_path, "rb") as f:
                    data = f.read()
                    codeType = chardet.detect(data)['encoding'].upper()
                    # print("%s's codeType is %s" % (item, codeType))
                    if codeType != "UTF-8":
                        print("%s's codeType is %s,change encode!" % (item, codeType))
                        self.convert(ts_file_path, codeType, out_enc)
                    else:
                        print("%s's codeType is %s, not change encode!" % (item, codeType))
                    print('-' * 50)


if __name__ == '__main__':
    path_root = os.getcwd()
    if len(sys.argv) == 2:
        path_root = sys.argv[1]
    search_file_pattern = ".ts"
    my_detect = TextDetect(path_root, search_file_pattern)
    my_detect.detect(out_enc="UTF-8")
