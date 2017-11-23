(function() {
  function handleClick(){
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {return tabs[0]})
    .then((tab) => {
      let url = new URL(tab.url);
      if (url.hostname != 'github.com'){
       console.warn('Open in binder only works on GitHub repositories for now.');
       return;
      };
      let parts = url.pathname.split('/');
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

      let my_binder_url = 'https://mybinder.org/v2/gh/'+parts[1] +'/'+parts[2] +'/' + branch_tag_hash+extra;
      console.info('Opening ' + url + 'using mybinder.org... enjoy !')
      browser.tabs.create({'url':my_binder_url});
    })

  }
  console.info('(Re) loading open-in-binder extension.');
  browser.browserAction.onClicked.addListener(handleClick);

  console.info('❤️ If you are reading this then you know about binder and javascript. ❤️');
  console.info('❤️ So you\'re skilled enough to contribute ! We\'re waiting for you on https://github.com/jupyterhub/ ❤️');
})()
