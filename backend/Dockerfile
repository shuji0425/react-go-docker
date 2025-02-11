# ベースイメージ
FROM golang:1.23

# 作業ディレクトリ
WORKDIR /app

# モジュールのキャッシュ
COPY go.mod go.sum ./
RUN go mod download

# ソースのコピー
COPY . .

# ビルド
RUN go build -o main .

# アプリを実行
CMD ["./main"]