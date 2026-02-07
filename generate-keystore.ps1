# Generate a new keystore
$keyStoreName = "release-key.jks"
$alias = "key0"
$password = "your_strong_password" # User should change this

Write-Host "Generating Keystore..."
keytool -genkey -v -keystore $keyStoreName -keyalg RSA -keysize 2048 -validity 10000 -alias $alias -storepass $password -keypass $password -dname "CN=EM-AI, OU=Mobile, O=EMAI, L=Cairo, S=Cairo, C=EG"

Write-Host "Keystore generated: $keyStoreName"

# Convert to Base64
$base64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($keyStoreName))

Write-Host "`n=== GITHUB SECRETS CONFIGURATION ==="
Write-Host "Go to: Settings > Secrets and variables > Actions > New repository secret"
Write-Host "1. Name: ANDROID_KEYSTORE_BASE64"
Write-Host "   Value: (Copy the string below)"
Write-Host $base64
Write-Host "`n2. Name: KEYSTORE_PASSWORD"
Write-Host "   Value: $password"
Write-Host "`n3. Name: KEY_ALIAS"
Write-Host "   Value: $alias"
Write-Host "`n4. Name: KEY_PASSWORD"
Write-Host "   Value: $password"
Write-Host "`n(Note: Change the password in this script before running if you want a custom one)"
