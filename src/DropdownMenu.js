
import React from 'react';

const DropdownMenu = () => {
 const handleScrollToSection = (sectionId) => {
  console.log(`Clicked on section: ${sectionId}`); 
   const section = document.getElementById(sectionId);
   if (section) {
     section.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }
 };


 return (
   <div className="dropdown-menu">
     <ul>
       <li onClick={() => handleScrollToSection('popular-movies')}>
         Popular Movies
       </li>
       <li onClick={() => handleScrollToSection('rom-com-movies')}>
         Romantic-Comedy Movies
       </li>
       <li onClick={() => handleScrollToSection('action-movies')}>
         Action Movies
       </li>
       <li onClick={() => handleScrollToSection('thriller-movies')}>
         Thriller Movies
       </li>
     </ul>
   </div>
 );
};


export default DropdownMenu;


