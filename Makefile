all: sign

hackernews-enhancement.zip: background.js enhance.js manifest.json
	$(RM) $@
	zip $@ $^

unexport WEB_EXT_FIREFOX
unexport WEB_EXT_FIREFOX_BINARY
unexport WEB_EXT_FIREFOX_PROFILE
sign:
	web-ext sign -a docs

clean:
	$(RM) *.zip
