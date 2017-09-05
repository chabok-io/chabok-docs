# How to Contribute

## Branch Organization
We will do our best to keep the master branch in good shape.

If you want to create or update Documentation you must create new branch and send a merge request.


## Project Structure

```sh
.
├── _config.yml #project config file,You don't need to change it!
├── _data
|   ├── nav_android.yml #android side bar data structore
|   ├── nav_ios.yml #ios side bar data structore
|   └── nav_windows.yml #windows side bar data structore
├── android
|   └── ****.md #android category content
├── ios
|   └── ****.md #ios category content
├── windows
|   └── ****.md #windows phone category content
├── _includes #Template partials
|   ├── footer.html
|   └── header.html
├── _layouts #template layout
|   ├── default.html
|   └── post.html
├── _posts #blog posts
|   ├── 2007-10-29-why-every-programmer-should-play-game.md
├── _sass #Template style
|   ├── _base.scss
|   └── _layout.scss
├── _site #generated static web page
├── .jekyll-metadata
└── index.html # can also be an 'index.md' with valid YAML Frontmatter
```

## Writing posts
As explained on the directory structure page, the _posts folder is where your blog posts will live.
but in our structure we have some categories like android , ios , windows phone and etc.you should create your post in related category folder.
our .md files have some headers you must know about it.

```sh
id: installation    #post id be a uniqe value per category and used in _data
title: افزودن کتابخانه چابک به پروژه    #post title
layout: android     #per category you should clear your layout
permalink: android/installation.html    #define post url,it's so important to show your posts correctly
prev: knowledge.html    #define previous post for pagination
next: api.html  #define next post for pagination
```

