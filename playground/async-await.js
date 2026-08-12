//async function always return Promise, if nothing is defined inside
// function body then Promise is returned with fulfilled state  with undefined as value

const doWork = async () => {
    return "Jilu" 
}

console.log(doWork())