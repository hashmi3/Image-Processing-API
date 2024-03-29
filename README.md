# Image Processing API

## About

API for image resizing with client request caching feature.<br> 
Image Resizing is performed 4x-5x faster compared with quickest ImageMagick and GraphicsMagick, because of [libvips](https://github.com/libvips/libvips).

#
## How  to Run:
Set up the API server:
```
git clone https://github.com/hashmi3/Image-Processing-API.git
cd Image-Processing-API
npm run start
```

#
## Request Parameters
Standard GET request: /imgApi?img=[0-4]&width=[150-4096]&height=[150-2160]

Parameter values Limit:<br>
img = a number less then 5 for picture number selection<br>
width = a number between 150 to 4096 <br>
height = a number between 150 to 2160 <br>

![req.params](./public/req_parm.JPG)
#

