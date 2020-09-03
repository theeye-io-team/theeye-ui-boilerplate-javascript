export default function counter (counter = 0, action) {
  switch (action.type) {
    case 'SET_COUNTER':
      counter = action.counter
      return counter
      break;
    default:
      return counter 
      break
  }
}
