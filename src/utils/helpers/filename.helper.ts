export function uploadFileName(req, file, cb) {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const originalname = file.originalname;
  const fileExtName = originalname.slice(
    ((originalname.lastIndexOf('.') - 1) >>> 0) + 2,
  ); // Extract the file extension
  const filename = `${uniqueSuffix}.${fileExtName}`;
  cb(null, filename);
}