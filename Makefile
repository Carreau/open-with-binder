release:
	python tools/update_manifest.py ${VERSION}
	git add manifest.json
	git commit -m'release version ${VERSION}'
	git tag -m'release version ${VERSION}' ${VERSION}
	git archive --format=zip HEAD > binderify-${VERSION}.zip
