(() => {
  // dqs shortcut
  const $ = (selector) => document.querySelector(selector);

  const updateMenuCnt = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount} 개`;
  };

  const addMenuName = () => {
    if ($('#espresso-menu-name').value === '') {
      alert('값을 입력해주세요');
      return;
    }
    const espressoMenuName = document.querySelector(
      '#espresso-menu-name'
    ).value;
    const menuItemTemplate = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
                      <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
                      <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                      >
                        삭제
                      </button>
                    </li>
                    `;
    };
    $('#espresso-menu-list').insertAdjacentHTML(
      'beforeend',
      menuItemTemplate(espressoMenuName)
    );
    updateMenuCnt();
    $('#espresso-menu-name').value = '';
  };

  const updateAndDeleteMenuName = (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      const $menuName = e.target.closest('li').querySelector('.menu-name');
      $menuName.innerText = prompt('메뉴명을 수정하세요', $menuName.innerText);
    }
    if (e.target.classList.contains('menu-remove-button')) {
      if (confirm('정말 삭제하겠습니까?')) {
        e.target.closest('li').remove();
        updateMenuCnt();
      }
    }
  };

  // preventing form tag submit
  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // button click
  $('#espresso-menu-submit-button').addEventListener('click', addMenuName);

  // menu input
  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    if (e.key === 'Enter') {
      addMenuName();
    }
  });

  // list update && delete
  $('#espresso-menu-list').addEventListener('click', (e) => {
    updateAndDeleteMenuName(e);
  });
})();
