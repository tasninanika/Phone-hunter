const loadPhone = async (searchText, isShowall) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones, isShowall);
}

const displayPhones = (phones, isShowall) => {
    // console.log(phones);
    // 1. get container
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container
    phoneContainer.textContent = ''

    // display show all buttons
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowall){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // display 12 phones
    if(!isShowall){
        phones = phones.slice(0,12);

    }
    
    phones.forEach(phone =>{
        // console.log(phone);
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        // 3. inner html
        phoneCard.innerHTML = `
        <figure>
            <img
            src="${phone.image}"
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowdetail('${phone.slug}')" class="btn btn-primary">Show details</button>
            </div>
        </div>
        `;
        // 4. apend child
        phoneContainer.appendChild(phoneCard);
    } )

    // hide loading spinner
    toggleLoadingSpinner()
}

// 
const handleShowdetail= async (id) =>{
    console.log('show');
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}
const showPhoneDetails = (phone) =>{
    // show the modal
    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowall) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowall);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpineer = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpineer.classList.remove('hidden');        
    }
    else{
        loadingSpineer.classList.add('hidden');
    }
}

// handle show all
const handleShowall = () =>{
    handleSearch(true);
}

// loadPhone();