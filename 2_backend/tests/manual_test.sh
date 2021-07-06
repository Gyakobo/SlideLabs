echo "Assert raise input_error"
curl -d '{"key":"value"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:2021/backend/get_html_file_by_url/
echo ""
echo ""

echo "Assert return hello world"
curl -d '{"url":""}' -H "Content-Type: application/json" -X POST http://127.0.0.1:2021/backend/get_html_file_by_url/
echo ""