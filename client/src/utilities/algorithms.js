export const binarySearch = (dataset, key) => {

    let pos = 0, 
    n = dataset.length, 
    start = 0, 
    end = n;
    
    console.log("input array " , dataset , " to find => " , key);

    if(end <= start)
        return 0;
    
    if(dataset[n-1] < key)
        return n - 1;

    while(start <= end) {

        pos = parseInt(start + (end - start) / 2);
        if(dataset[pos] == key) {
            return pos;
        }
        else if(dataset[pos] < key) {
            if((pos + 1 < n) && dataset[pos+1] > key)
                return pos;
            start = pos + 1;
        } 
        else {
            end = pos - 1;
        }

    }

    return pos;
}