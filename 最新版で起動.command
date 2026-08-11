#!/bin/zsh
# ============================================================
#  ポートフォリオを「常に最新版」で起動
#  ダブルクリックするだけ:
#   1) GitHub から最新を取得 (git pull)
#   2) 必要なら依存インストール
#   3) 開発サーバー起動 → ブラウザで自動オープン
#  止めるとき: このターミナルを閉じるか Ctrl+C
# ============================================================

cd "$(dirname "$0")" || exit 1
export PATH="/opt/homebrew/bin:$PATH"

echo "▲ shintaro-portfolio-luxury"
echo "  $(pwd)"
echo ""

if ! command -v npm >/dev/null 2>&1; then
  echo "✗ npm が見つかりません。'brew install node' を実行してください。"
  read "?Enter で閉じます "
  exit 1
fi

# 1) 最新版を取得（git リポジトリのときだけ・失敗しても続行）
if [ -d .git ]; then
  echo "• GitHub から最新を取得中..."
  git pull --ff-only 2>&1 | sed 's/^/    /' || \
    echo "    （ローカルに変更があり自動取得をスキップ。今あるコードで起動します）"
  echo ""
fi

# 2) 依存インストール（初回 or package.json 更新時）
if [ ! -d node_modules ]; then
  echo "• 初回セットアップ: npm install ..."
  npm install || { echo "✗ install 失敗"; read "?Enter で閉じます "; exit 1; }
  echo ""
fi

URL="http://localhost:3060"

# 3) サーバーが立ち上がったらブラウザを開く
( for i in {1..60}; do
    if curl -s -o /dev/null "$URL"; then open "$URL"; break; fi
    sleep 0.5
  done ) &

echo "• 起動中... 数秒でブラウザが開きます ($URL)"
echo ""
npm run dev -- -p 3060
