(function() {
  function handleClick(){
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {return tabs[0]})
    .then((tab) => {
      let url = new URL(tab.url);
      console.log('the url is', url);
      console.log(url.pathname.split('/'))
      let my_binder_url = "";
      let parts = url.pathname.split('/');
      if (url.hostname === 'github.com'){
        if (parts.length < 3){
          console.warn('While you are on GitHub, You do not appear to be in a github repository. Aborting.');
          return;
        }
        let branch_tag_hash = 'master';
        if (parts.length >= 5){
          branch_tag_hash = parts[4]; // part 3 is 'blob' or 'tree'.
        }
        let extra = '';
        if (parts.length > 5){
          extra = '?filepath='+parts.slice(5).join('%2F')
        }
        my_binder_url = 'https://mybinder.org/v2/gh/'+parts[1] +'/'+parts[2] +'/' + branch_tag_hash+extra;
      }
      else if (url.hostname === 'gist.github.com') {
        if (parts.length < 3){
          console.warn('While you are on GitHub Gists, you do not appear to be in a Gist. Aborting.');
          return;
        }
        let branch_tag_hash = 'master';
        if (parts.length === 4){
          branch_tag_hash = parts[3];
        }

        my_binder_url = 'https://mybinder.org/v2/gist/'+parts[1] + '/'+ parts[2] + '/' + branch_tag_hash;
      }
      else if (url.hostname === 'gitlab.com') {
        if (parts.length < 3){
          console.warn('While you are on GitLab, you do not appear to be in a git repository. Aborting.');
          return;
        }
        let repo = '';
        let extra = '';
        let branch_tag_hash = 'master';
        let blob_idx = parts.indexOf("blob");
        if (blob_idx === -1) {
          // tree is used instead of blob when looking at a directory so try
          // to find that instead
          blob_idx = parts.indexOf("tree");
        }
        if (blob_idx > 1){
          repo = parts.slice(1, blob_idx).join('/');
          branch_tag_hash = parts[blob_idx+1];
          extra = '?filepath='+parts.slice(blob_idx+2).join('%2F')
        }
        else {
          repo = parts.slice(1).join('/');
        }
        my_binder_url = 'https://mybinder.org/v2/gl/'+encodeURIComponent(repo) +'/' + branch_tag_hash + extra;
      }
      else {
        console.warn('Open in binder only works on GitHub repositories for now.');
        return;
      };
      console.info('Opening ' + url + 'using mybinder.org... enjoy !')
      browser.tabs.create({'url':my_binder_url});
    })

  }
  console.info('(Re) loading open-in-binder extension.');
  browser.browserAction.onClicked.addListener(handleClick);

  console.info('❤️ If you are reading this then you know about binder and javascript. ❤️');
  console.info('❤️ So you\'re skilled enough to contribute ! We\'re waiting for you on https://github.com/jupyterhub/ ❤️');
})()
