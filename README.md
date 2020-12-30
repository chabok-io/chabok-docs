# Chabok Documentation 
Present chabok push sdk documentaition by jekyl static site generator
 
- [Read the chabok Documentation pre-release](https://chabok-io.github.io/chabok-docs/)

- [Read the chabok Documentation](https://doc.chabok.io)

## Installing some necessary packages

Jekyll requires Ruby to work.please check Ruby was installed.
Now you can install Jekyll and bundler gems using the following command.

```bash
gem install jekyll bundler
```

switch to jekyll home directory

```bash
 bundle install
```

Now run the following command to build Jekyll.

```bash
jekyll build
```

You should see following output that the server is running.

```bash
onfiguration file: /home/jekyll/_config.yml
Configuration file: /home/jekyll/_config.yml
            Source: /home/jekyll
       Destination: /home/jekyll/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 0.401 seconds.
 Auto-regeneration: disabled when running server detached.
Configuration file: /home/jekyll/_config.yml
    Server address: http://127.0.0.1:4000/
Server detached with pid '7442'. Run `pkill -f jekyll' or `kill -9 7442' to stop the server.
```

The site will be now accessible on local system only as it is bound to localhost only. It will also listen to port 4000. You can configure it to listen to all the IP address as well as port number 80, you can run the following command.

```bash
bundle exec jekyll serve --host 0.0.0.0 --port 80 --detach
```

Jekyll generate static site in _site folder.
