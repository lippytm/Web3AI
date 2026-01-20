module github.com/lippytm/Web3AI

go 1.22

require (
	// AI Stack
	github.com/openai/openai-go v0.1.0-alpha.36
	github.com/tmc/langchaingo v0.1.12
	
	// Web3 Stack
	github.com/ethereum/go-ethereum v1.14.12
	github.com/gagliardetto/solana-go v1.12.0
	
	// Messaging
	github.com/slack-go/slack v0.15.0
	github.com/bwmarrin/discordgo v0.28.1
	
	// Data
	github.com/jackc/pgx/v5 v5.7.2
	github.com/redis/go-redis/v9 v9.7.0
	github.com/aws/aws-sdk-go-v2 v1.32.6
	github.com/aws/aws-sdk-go-v2/service/s3 v1.68.0
	github.com/ipfs/go-ipfs-api v0.7.0
)
