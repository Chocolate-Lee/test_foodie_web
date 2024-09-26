#!/bin/sh

PACKEG_ENV=$1

npm run build
echo "-------build 完成-------"

if [ $PACKEG_ENV == "pro" ]; then
	echo "-------上传生产环境-------"
	scp -r build root@47.95.241.149:/mnt/web/factory_web.bak
else
	echo "-------上传测试环境-------"
	scp -r build root@47.95.241.149:/mnt/web/factory_web.bak
fi


echo "-------上传成功-------"