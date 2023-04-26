// Date Formate
export const dateFormate = (date) =>{
    const formattedDate =new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      return formattedDate;
}
// End