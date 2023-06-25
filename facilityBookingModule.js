/****************************README FOR THE SCHEMA **********/
//clubHouseBooking && tennisCourtBooking are two objects with booking details
/*
Please have a look into the Schema
 1. Pseudo Club House Booking object (Schema for the clubHouseBooking Details) will look something like this:
 {
  'Date':{
    List of Slots and Booking Details
    '10':{
      'bookedBy':'Booking Persons Name'
    },
    '11':{
      'bookedBy':'Booking Persons Name'
    },
    '12':{
      'bookedBy':'Booking Persons Name'
    },
    '13':{
      'bookedBy':'Booking Persons Name'
    },
  }
 }

2. Same Schema is for tenniscourt

 */
/********************README FOR SCHEMA********************** */

/*****CODE STARTS FROM HERE********/

let clubHouseBooking = {};
let tennisCourtBooking = {};

// Main Function which take cares of the booking

function book(date, startTime, endTime, name, facilitytoBook) {
  // Invalid Time Slot
  if (endTime < startTime) {
    console.log("End Time Cannot be before start time");
    return;
  }
  // Converting to Lower Case for Ease of the User
  let facility = facilitytoBook.toLowerCase();
  // If ClubHouse is to be booked block
  if (facility === "clubhouse") {
    // Check if the date is present or not in the object.
    if (!clubHouseBooking[date]) {
      // Create a new Date key if not present in the object. It will mean it is the first booking of that day
      clubHouseBooking[date] = {};
      clubHouseBooking[date].bookedSlots = {};
      // Initializing the booking Amount
      let bookingAmount = 0;
      for (let i = startTime; i < endTime; i++) {
        clubHouseBooking[date].bookedSlots[i] = { bookedBy: name };
        //  Rs. 100 from 10am to 4pm and Rs. 500 from 4pm to 10pm
        if (i >= 10 && i < 16) {
          // Fix the condition for the booking amount calculation
          bookingAmount += 100;
        } else if (i >= 16 && i <= 22) {
          bookingAmount += 500;
        }
      }
      // Return Message Booked
      return `Booked Rs. ${bookingAmount}`;
    } else {
      // Entering this block will mean not the first booking for this day

      // Booking is Not Possible Overlapping
      // If the start date is already present
      if (clubHouseBooking[date].bookedSlots[startTime]) {
        // console.log("Facility is Already Booked");
        return "Booking Failed. Already Booked";
      }
      // Booking is Not Possible Overlapping
      // Check if the preffered slot is empty or not
      for (let i = startTime; i < endTime; i++) {
        if (clubHouseBooking[date].bookedSlots[i]) {
          // console.log("Facility is Already Booked");
          return "Booking Failed. Already Booked";
        }
      }
      // Now if the interpreter is here that means slots are available
      // Booking is Possible
      // Book and reserve the slot and send message
      let bookingAmount = 0;
      for (let i = startTime; i < endTime; i++) {
        clubHouseBooking[date].bookedSlots[i] = { bookedBy: name };
        if (i >= 10 && i < 16) {
          // Fix the condition for the booking amount calculation
          bookingAmount += 100;
        } else if (i >= 16 && i <= 22) {
          bookingAmount += 500;
        }
      }
      return `Booked Rs. ${bookingAmount}`;
    }
    // If Tenniscourt is to be booked block
  } else if (facility === "tenniscourt") {
    if (!tennisCourtBooking[date]) {
      tennisCourtBooking[date] = {};
      tennisCourtBooking[date].bookedSlots = {};
      let bookingAmount = 0;
      for (let i = startTime; i < endTime; i++) {
        tennisCourtBooking[date].bookedSlots[i] = { bookedBy: name };
        // Flat Rate for the Tennis Court
        bookingAmount += 50;
      }
      return `Booked Rs. ${bookingAmount}`;
    } else {
      // Booking is Not Possible Overlapping
      if (tennisCourtBooking[date].bookedSlots[startTime]) {
        // console.log("Facility is Already Booked");
        return "Booking Failed. Already Booked";
      }
      // Booking is Not Possible Overlapping
      for (let i = startTime; i < endTime; i++) {
        if (tennisCourtBooking[date].bookedSlots[i]) {
          //console.log("Facility is Already Booked");
          return "Booking Failed. Already Booked";
        }
      }
      // Booking is Possible
      let bookingAmount = 0;
      for (let i = startTime; i < endTime; i++) {
        tennisCourtBooking[date].bookedSlots[i] = { bookedBy: name };
        // Fix the condition for the booking amount calculation
        bookingAmount += 50;
      }
      return `Booked Rs. ${bookingAmount}`;
    }
  } else {
    return "Invalid Facility Selected";
  }
}

/*****SAMPLE TESTS EACH FOR TWO FACILITIES ARE AS BELOW********/

// Tests for Tennis Court and ClubHouse

//1.  Tests for Tennis Court

let tennis1 = book("6/25/2023", "12", "16", "John", "tenniscourt");
console.log("1 ", tennis1);

// Test for OverLapping Time Slot
let tennis2 = book("6/25/2023", "12", "15", "John", "tenniscourt");
console.log("2 ", tennis2);

// Test for OverLapping Time Slot but different Date. Should be booked
let tennis3 = book("6/26/2023", "12", "15", "John", "tenniscourt");
console.log("3 ", tennis3);

console.log(`
"
BREAK
"
`);

//1.  Tests for Club House

let club1 = book("6/25/2023", "11", "16", "John", "clubhouse");
console.log("1 ", club1);

// Test for OverLapping Time Slot
let club2 = book("6/25/2023", "12", "15", "John", "clubhouse");
console.log("2 ", club2);

// Test for OverLapping Time Slot but different Date. Should be booked.
let club3 = book("6/26/2023", "16", "19", "John", "clubhouse");
console.log("3 ", club3);
// Test for Checking if Different rates are applying
let club4 = book("6/26/2023", "10", "12", "John", "clubhouse");
console.log("4 ", club4);
