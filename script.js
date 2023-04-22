var gdUrl = $('#gd-url');
$('#btn-convert').on('click', function (event) {
  if (!isValidUrl(gdUrl.val())) {
    alert('You have enter invalid url. Please check again.');
    gdUrl.val('');
    return;
  }

  var gdId = extractFileId(gdUrl.val());
  var prefix = 'http://drive.google.com/uc?export=view&id=';
  $('#result').val(prefix + gdId);
  $('#result-img-tag').val("<img src='" + prefix + gdId + "' />");
  $('#preview').attr('src', prefix + gdId);
});

var clipboard = new Clipboard('.btn');

clipboard.on('success', function (e) {
  console.info('Action:', e.action);
  console.info('Text:', e.text);
  console.info('Trigger:', e.trigger);

  e.clearSelection();
});

clipboard.on('error', function (e) {
  console.error('Action:', e.action);
  console.error('Trigger:', e.trigger);
});

// validity check. ref: https://gist.github.com/jlong/2428561
function isValidUrl(url) {
  // to be impl...
  var parser = document.createElement('a');
  parser.href = url;

  if (
    url === '' ||
    parser.hostname !== 'drive.google.com' ||
    !parser.pathname.includes('/file/d/')
  )
    return false;

  return true;
}

function extractFileId(url) {
  if (!url) url = window.location.href;

  var strip = url
    .replace(/https:\/\/drive.google.com\/file\/d\//gi, '')
    .replace(/\/view\?[a-zA-Z=\/]+/gi, '');

  return strip;
}
