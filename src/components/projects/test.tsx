export const MediaRow = ({ items }: MediaRowProps) => {
	return items.map((props) =>
		props.type === "image" ? (
			<MediaItemImage
				key={props.image.src}
				image={props.image}
				alt={props.alt}
			/>
		) : (
			<MediaItemVideo key={props.src} src={props.src} />
		),
	);
};

const MediaItemImage = ({
	image,
	alt,
}: { image: ImageMetadata; alt: string }) => {
	return (
		<img src={image.src} width={image.width} height={image.height} alt={alt} />
	);
};

const MediaItemVideo = ({ src }: { src: string }) => {
	return <video src={src} muted controls playsInline />;
};
