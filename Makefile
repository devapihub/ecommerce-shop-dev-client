PKG_MGR = npm

SSH = sshpass -p $(DEPLOY_PASS) ssh -p $(SSH_PORT) \
      -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
      $(SSH_USER)@$(SSH_HOST)

SCP = sshpass -p $(DEPLOY_PASS) scp -P $(SSH_PORT) \
      -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null

.PHONY: release install build deploy nginx-reload nginx-restart clean print

release: install build deploy nginx-restart
	@echo "✅ Done -> $(SSH_USER)@$(SSH_HOST):$(REMOTE_DIR)"

install:
	@npm ci || npm install

build:
	@npm run build
	@test -d build || (echo "❌ Không thấy build/ sau build"; exit 1)

deploy:
	@echo "→ deploy build/ via scp"
	@$(SSH) "sudo mkdir -p $(REMOTE_DIR) && sudo find $(REMOTE_DIR) -mindepth 1 -delete"
	@$(SCP) -r build/* $(SSH_USER)@$(SSH_HOST):$(REMOTE_DIR)/

nginx-reload:
	@$(SSH) "sudo nginx -t && sudo systemctl reload nginx || (sudo systemctl status nginx --no-pager; exit 1)"

nginx-restart:
	@$(SSH) "sudo nginx -t && sudo systemctl restart nginx || (sudo systemctl status nginx --no-pager; exit 1)"

clean:
	@rm -rf build

print:
	@echo "SERVER: $(SSH_USER)@$(SSH_HOST):$(SSH_PORT)"
	@echo "REMOTE: $(REMOTE_DIR)"