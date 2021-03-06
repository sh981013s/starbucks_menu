(() => {
  // dqs shortcut
  const $ = (selector) => document.querySelector(selector);

  let menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  let currentCategory = 'espresso';

  const store = {
    setLocalStorage(menu) {
      localStorage.setItem('menu', JSON.stringify(menu));
    },
    getLocalStorage() {
      return JSON.parse(localStorage.getItem('menu'));
    },
  };

  const updateMenuCnt = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount} 개`;
  };

  const render = () => {
    const template = menu[currentCategory]
      .map((item, idx) => {
        return `<li data-menu-id="${idx}" class="menu-list-item d-flex items-center py-2">
                      <span class="w-100 pl-2 menu-name">${item.name}</span>
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
      })
      .join('');
    $('#espresso-menu-list').innerHTML = template;
    updateMenuCnt();
  };

  const init = () => {
    if (store.getLocalStorage() && store.getLocalStorage().length > 0) {
      menu = store.getLocalStorage();
    }
    render();
  };

  init();

  const addMenuName = () => {
    if ($('#espresso-menu-name').value === '') {
      alert('값을 입력해주세요');
      return;
    }
    const espressoMenuName = document.querySelector(
      '#espresso-menu-name'
    ).value;
    menu[currentCategory].push({ name: espressoMenuName });
    store.setLocalStorage(menu);
    render();
    $('#espresso-menu-name').value = '';
  };

  const updateAndDeleteMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    if (e.target.classList.contains('menu-edit-button')) {
      const $menuName = e.target.closest('li').querySelector('.menu-name');
      const updatedMenuName = prompt(
        '메뉴명을 수정하세요',
        $menuName.innerText
      );
      menu[currentCategory][menuId].name = updatedMenuName;
      store.setLocalStorage(menu);
      $menuName.innerText = updatedMenuName;
    }
    if (e.target.classList.contains('menu-remove-button')) {
      if (confirm('정말 삭제하겠습니까?')) {
        e.target.closest('li').remove();
        menu[currentCategory].splice(menuId, 1);
        store.setLocalStorage(menu);
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

  $('nav').addEventListener('click', (e) => {
    const isCategoryBtn = e.target.classList.contains('cafe-category-name');
    if (isCategoryBtn) {
      const categoryName = e.target.dataset.categoryName;
      currentCategory = categoryName;
      $('#category-title').innerText = `${e.target.innerText} 지점 메뉴관리`;
      render();
    }
  });
})();
