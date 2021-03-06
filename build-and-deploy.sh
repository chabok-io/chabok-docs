#!/bin/sh

GITHUB_TOKEN=$1 &&
GITHUB_REPOSITORY=$2 &&
GITHUB_ACTOR=$3 &&

echo ${GITHUB_TOKEN} &&
echo ${GITHUB_REPOSITORY} &&
echo ${GITHUB_ACTOR} &&

echo '===> Start running scripts for jekyll build.' &&

echo 'Removing Gemfile.lock' &&
touch /srv/jekyll/Gemfile.lock && 
chmod a+w /srv/jekyll/Gemfile.lock && 
rm -rf /srv/jekyll/Gemfile.lock && 
touch /srv/jekyll/Gemfile.lock && 
chmod a+w /srv/jekyll/Gemfile.lock && 

echo 'Removing Gemfile' &&
touch /srv/jekyll/Gemfile && 
chmod a+w /srv/jekyll/Gemfile && 
rm -rf /srv/jekyll/Gemfile && 
touch /srv/jekyll/Gemfile && 
chmod a+w /srv/jekyll/Gemfile &&


echo 'Renaming Gemfile-dev to Gemfile' &&
touch /srv/jekyll/Gemfile-dev && 
chmod a+w /srv/jekyll/Gemfile-dev &&
mv /srv/jekyll/Gemfile-dev /srv/jekyll/Gemfile

sed -i -e "s/baseurl: \"\"/baseurl: \"\/chabok-docs\"/g" _config.yml

echo '===> Start Installing bundle' &&

bundle install && 
bundle update --bundler && 
bundle update && 

echo '👍 BUNDLE INSTALLED—BUILDING THE SITE' && 

chmod 777 /srv/jekyll && 
jekyll build && 

echo '👍 THE SITE IS BUILT—PUSHING IT BACK TO GITHUB-PAGES' && 

cd /srv/jekyll/_site &&
remote_repo="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" &&
remote_branch="gh-pages" && 

echo remote_branch $remote_branch &&
echo remote_repo $remote_repo &&

git init && 
git config user.name --global "${GITHUB_ACTOR}" &&
git config --global user.email "${GITHUB_ACTOR}@users.noreply.github.com" &&
git add . && 

echo -n 'Files to Commit:' && ls -l | wc -l && 
echo -n 'Before Commit' &&
git commit -m "action build" &&

echo -n 'Before push' &&
git push --force $remote_repo master:$remote_branch &&

echo -n 'After push' &&
rm -fr .git && 

cd .. &&
echo '👍 GREAT SUCCESS!'
