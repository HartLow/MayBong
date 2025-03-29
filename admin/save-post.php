<?php
header('Content-Type: application/json');

// Đặt đường dẫn gốc cho các thư mục lưu trữ
$data_dir = '../posts/data/';
$images_dir = '../posts/images/';

// Tạo thư mục nếu chưa tồn tại
if (!file_exists($data_dir)) mkdir($data_dir, 0777, true);
if (!file_exists($images_dir)) mkdir($images_dir, 0777, true);

// Nhận dữ liệu từ request
$post = json_decode(file_get_contents('php://input'), true);

// Lưu file txt
$txt_content = "ID: {$post['id']}\n";
$txt_content .= "Title: {$post['title']}\n";
$txt_content .= "Content: {$post['content']}\n";
$txt_content .= "Date: {$post['date']}\n";

$txt_file = $data_dir . "post_{$post['id']}.txt";
file_put_contents($txt_file, $txt_content);

// Lưu file ảnh nếu có
if (isset($post['image'])) {
    $image_data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $post['image']));
    $image_file = $images_dir . "image_{$post['id']}.png";
    file_put_contents($image_file, $image_data);
}

echo json_encode(['success' => true]);
