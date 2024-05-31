# Create file called .integration-test-env and define the following variables
# export POSTMAN_API_KEY='your-api-key'
# export POSTMAN_COLLECTION='your-collection'

$envFile = ".integration-test-env"

if (-not (Get-Command postman -ErrorAction SilentlyContinue)) {
    Write-Error "Postman is not installed."
    exit 1
}

if (-not (Test-Path $envFile)) {
    Write-Error "Error: $envFile does not exist."
    exit 1
}

Get-Content $envFile | ForEach-Object {
    if ($_ -match 'export (\w+)=(.+)') {
        [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2].Trim("'"))
    }
}

if (-not $env:POSTMAN_API_KEY -or -not $env:POSTMAN_COLLECTION) {
    Write-Error "Error: Environment variables POSTMAN_API_KEY and/or POSTMAN_COLLECTION are not set."
    exit 1
}

postman login --with-api-key $env:POSTMAN_API_KEY
postman collection run $env:POSTMAN_COLLECTION
