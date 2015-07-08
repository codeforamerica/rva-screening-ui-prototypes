install:
	npm install
	pip install -r ./requirements.txt

run:
	gulp & 
	foreman run python run.py \
		--env=.env

deploy_static:
	gulp build
	python ./upload_assets.py

deploy:
	make deploy_static
	git push heroku master
