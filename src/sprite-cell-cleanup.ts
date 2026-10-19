/** Renderer-side registration cleanup: ignore detached fragments from adjacent generated cells.
 * The original generated atlas is preserved; this only masks each runtime frame's stray islands.
 */
export function keepMainSprite(pixels:Uint8ClampedArray,width:number,height:number,cell:number){
 if(width%cell||height%cell||pixels.length!==width*height*4)throw Error('Invalid atlas grid');
 const visited=new Uint8Array(cell*cell),queue=new Int32Array(cell*cell),mask=new Uint8Array(cell*cell);
 for(let cy=0;cy<height;cy+=cell)for(let cx=0;cx<width;cx+=cell){visited.fill(0);mask.fill(0);let best:number[]=[];
  const alpha=(index:number)=>pixels[((cy+Math.floor(index/cell))*width+cx+index%cell)*4+3];
  for(let start=0;start<cell*cell;start++){if(visited[start]||alpha(start)<16)continue;let head=0,tail=1;queue[0]=start;visited[start]=1;while(head<tail){const current=queue[head++],x=current%cell,y=Math.floor(current/cell);for(const next of [x?current-1:-1,x<cell-1?current+1:-1,y?current-cell:-1,y<cell-1?current+cell:-1])if(next>=0&&!visited[next]&&alpha(next)>=16){visited[next]=1;queue[tail++]=next;}}if(tail>best.length)best=Array.from(queue.subarray(0,tail));}
  for(const index of best)mask[index]=1;for(let index=0;index<cell*cell;index++)if(!mask[index])pixels[((cy+Math.floor(index/cell))*width+cx+index%cell)*4+3]=0;
 }
}
