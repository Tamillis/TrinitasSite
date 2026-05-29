cd ~/TrinitasSite

git fetch origin main

if ! git diff --quiet HEAD origin/main -- package.json; then
    echo "Changes detected in package.json. Running npm install..."
    git pull origin main
    npm install --production
else
    echo "No changes in package.json. Skipping npm install."
    git pull origin main
fi

npm run build

rm -rf /var/www/personal-site/assets/*
rm  /var/www/personal-site/index.html
cp dist/index.html /var/www/personal-site/index.html
cp -r dist/assets/* /var/www/personal-site/assets