
const loadPhone = async (searchItem,isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchItem}`);
    const data = await res.json();
    const phone = data.data;
    //console.log(phone);
    displyPhone(phone, isShowAll);
    

}


const displyPhone = (phones,isShowAll) =>{

    const phoneContainer =  document.getElementById('phone_container')
    phoneContainer.textContent = '';
    //console.log(phones);
    
    // display show all phone if more then 12
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    

    //console.log('is show all',isShowAll);
    
    if(!isShowAll){
        phones = phones.slice(0,5)
    }
  

 

    phones.forEach( phone=> {
        console.log(phone);

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-8 shadow-xl`;
        phoneCard.innerHTML= `
        <figure>
                <img
                src="${phone.image}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title"> ${phone.phone_name}</h2>

                <p> Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                <div class="card-actions justify-center">
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        
        `

        phoneContainer.appendChild(phoneCard);
        
    });

    // hide loading spinner
    toggleLoadingSpinner(false);

}

// show details section

const showDetails = async (id) =>{
    //console.log('click',id);

    // single phone data

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    //console.log(data);
    
    const phone = data.data;
    
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;



    const showContainerDetails = document.getElementById('show-details-container');
    showContainerDetails.innerHTML = `

    <img src= ${phone.image} alt="" /> 

    <p ><span class ="font-bold">Brand: </span>${phone?.brand} </p>
    <p><span class ="font-bold">slug: </span>${phone?.slug} </p>
    <p><span class ="font-bold">Storage: </span>${phone?.mainFeatures?.storage} </p>
    <p><span class ="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize} </p>
    <p><span class ="font-bold">Memory: </span>${phone?.mainFeatures?.memory} </p>
    <p><span class ="font-bold">chipSet: </span>${phone?.mainFeatures?.chipSet} </p>
    
   
    `
    
    // show modal
    show_details_modal.showModal();
 } 


  //handler search button

        const searchHandle =(isShowAll) => {
            toggleLoadingSpinner(true);
            const searchFlid = document.getElementById('search_fild');
            const searchText = searchFlid.value;

            console.log(searchText);
            loadPhone(searchText, isShowAll);
                
            
        }
        const toggleLoadingSpinner = (isLoading) =>{
            const lodingspinner = document.getElementById('loading-spiner');
            if(isLoading){
                lodingspinner.classList.remove('hidden');
            }
            else{
                lodingspinner.classList.add('hidden');
            }
            
        }
    
     // handle show all

     const showAll = () =>{
        searchHandle(true);
     }
    
     // show details in modal

    

   
 
        loadPhone();


    
