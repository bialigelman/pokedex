function Image({src, alt, className, width, height}){
    return <img className={className} width={width} height={height} src={src} alt={alt}/>
}

export default Image