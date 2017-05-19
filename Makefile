hackernews-enhancement.zip: background.js enhance.js manifest.json
	$(RM) $@
	zip $@ $^

clean:
	$(RM) *.zip
