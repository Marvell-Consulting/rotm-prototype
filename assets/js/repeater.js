'use strict';

const hide = function hide(e) {
  e.classList.add('hidden')
};
const show = function show(e) {
  e.classList.remove('hidden');
}

const init = function init() {
  const container = document.getElementById('url-repeater');
  if (!container || !container.querySelectorAll) {
    return;
  }

  const fields = [].map.call(container.querySelectorAll('.form-group'), function(f) {return f});
  const inputs = fields.map(function(f) {return f.querySelector('textarea')});
  const addAnother = document.createElement('p');
  const addAnotherLink = document.createElement('a');
  addAnotherLink.appendChild(document.createTextNode('Add another link'));
  addAnotherLink.href = 'javascript:void(0)';
  addAnotherLink.onclick = function() {
    count = Math.min(count + 1, fields.length);
    refresh();
  };
  addAnother.appendChild(addAnotherLink);
  container.appendChild(addAnother);

  fields.forEach(function(field, n) {
    const removeLink = document.createElement('a');
    removeLink.href = 'javascript:void(0)';
    removeLink.className = 'remove';
    removeLink.appendChild(document.createTextNode('Remove'));
    removeLink.onclick = function() {
      const values = inputs.map(function(f) {f.value}).filter(function (_, i) {return n !== i});
      inputs.forEach(function(f, i) {f.value = values[i] || ''});
      count = Math.max(count - 1, 1);
      refresh();
    };
    field.removeLink = removeLink;
    field.appendChild(removeLink);
  });

  let count = Math.max(1, inputs.filter(function(f) {return f.value}).length);

  const refresh = function() {
    fields.forEach(function (field, i) {
      if (i === 0 || i < count) {
        show(field);
      } else {
        hide(field);
      }
    });

    if (count < fields.length) {
      show(addAnother);
    } else {
      hide(addAnother);
    }

    if (count === 1) {
      hide(fields[0].removeLink);
    } else {
      show(fields[0].removeLink);
    }
  };

  refresh();

};

module.exports = { 
  'init': init
};
