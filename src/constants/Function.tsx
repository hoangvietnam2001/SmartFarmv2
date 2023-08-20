export function shortenText (Text: string){
    if (Text.length > 15){
        return Text.slice(-15) + '...';
    }
    return Text;
}