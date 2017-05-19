all: sign

hackernews-enhancement.zip: background.js enhance.js manifest.json
	$(RM) $@
	zip $@ $^

sign:
	web-ext sign -a docs

clean:
	$(RM) *.zip
