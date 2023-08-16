/* 随机样式 */
let _index = 100;
const colors = [
	"#dcc10c",
	"#299bec",
	"#ea5455",
	"#7367f0",
	"#32ccbb",
	"#f6416c",
	"#28c76f",
	"#9f44d3",
	"#f55555",
	"#736efe",
	"#e96d71",
	"#de4313",
	"#d939cd",
	"#4c83ff",
	"#f072b6",
	"#c346c2",
	"#5961f9",
	"#fd6585",
	"#465efb",
	"#ffc600",
	"#fa742b",
	"#5151e5",
	"#bb4e75",
	"#e255cd",
	"#63c549",
	"#0ecdde",
	"#f067b4",
	"#f067b4",
	"#ff9a9e",
	"#1dd5de",
	"#4facfe",
	"#f093fb",
	"#6fa3ef",
	"#bc99c4",
	"#46c47c",
	"#f9bb3c",
	"#e8583d",
	"#f68e5f",
]; // 定义你的颜色数组
const random = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;
const $el = $(".joe_leaving-list");
const maxWidth = $el.width();
const maxHeight = $el.height();
const radius1 = [
	"20px 300px",
	"20px 400px",
	"20px 500px",
	"30px 300px",
	"30px 400px",
	"30px 500px",
	"40px 300px",
	"40px 400px",
	"40px 500px",
];
const radius2 = [
	"300px 20px",
	"400px 20px",
	"500px 20px",
	"300px 30px",
	"400px 30px",
	"500px 30px",
	"300px 40px",
	"400px 40px",
	"500px 40px",
];
$(".joe_leaving-list .item").each((index, item) => {
	const zIndex = random(1, 99);
	const background = colors[random(0, colors.length - 1)];
	const width = Math.ceil($(item).width());
	const height = Math.ceil($(item).height());
	const top = random(0, maxHeight - height);
	const left = random(0, maxWidth - width);
	$(item).css({
		display: "block",
		zIndex,
		background,
		top,
		left,
		borderTopLeftRadius: radius2[random(0, radius2.length - 1)],
		borderTopRightRadius: radius1[random(0, radius1.length - 1)],
		borderBottomLeftRadius: radius1[random(0, radius1.length - 1)],
		borderBottomRightRadius: radius1[random(0, radius1.length - 1)],
	});
	$(item).draggabilly({ containment: true });
	$(item).on("dragStart", (e) => {
		_index++;
		$(item).css({ zIndex: _index });
	});
});