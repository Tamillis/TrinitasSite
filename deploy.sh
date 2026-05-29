if [ ! -d ~/TrinitasSite ]; then
  git clone https://github.com/Tamillis/TrinitasSite.git ~/TrinitasSite
  npm install
fi

cd ~/TrinitasSite

git fetch origin main

git pull origin main
npm install
npm run build

rm -rf /var/www/personal-site/assets/*
rm  /var/www/personal-site/index.html
cp dist/index.html /var/www/personal-site/index.html
cp -r dist/assets/* /var/www/personal-site/assets