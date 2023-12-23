## Rajouter l'utilisateur dans le lien

### git -c http.sslVerify=false clone https://usergit1@smeserver9/git/test_gltf.git

### OU/ET désactiver la vérification sur le repo en cours

### git config http.sslVerify false

### git config credential.helper store

### git push (http://example.com/repo.git)

---

### Push to local & remote repo

#### Add second remote repo

#### Add remote 2

git remote add upstream git@github.com:phdgthbgnr/threejs-poc.git

#### Create a new remote called "all" with the URL of the primary repo.

git remote add all https://usergit1@smeserver9/git/test_gltf.git

#### Re-register the remote as a push URL.

git remote set-url --add --push all https://usergit1@smeserver9/git/test_gltf.git

#### Add a push URL to a remote. This means that "git push" will also push to this git URL.

git remote set-url --add --push all git@github.com:phdgthbgnr/threejs-poc.git

git push all <BRANCH>
git push all primary_test

git fetch --all
