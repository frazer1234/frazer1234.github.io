curl --header 'Access-Token: o.r0rfvQah6E40bogS6JCF6w0Pstp1bT9o' \
     --header 'Content-Type: application/json' \
     --data-binary '{"body":"Space Elevator, Mars Hyperloop, Space Model S (Model Space?)","title":"Space Travel Ideas","type":"note"}' \
     --request POST \
     https://api.pushbullet.com/v2/pushes


curl -s \
  --form-string "token=a1ntu7ubs36c1o7xpnqi46yxwkpaud" \
  --form-string "user=u4f6a38f8smcathvtm5itr5pgqytbe" \
  --form-string "message=hello world" \
  https://api.pushover.net/1/messages.json