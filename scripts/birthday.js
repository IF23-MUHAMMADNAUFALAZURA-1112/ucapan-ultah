// Birthday page scripts

// ==========================================
// ⚠️ HARAP GANTI DENGAN DETAIL PRIBADI ANDA ⚠️
// ==========================================
const BDAY_NAME = "Siti"; // Ganti ini dengan nama panggilan pasangan Anda
const HBD_WISH_TEXT = "Selamat Ulang Tahun yah sayang, maaf kalau aku sering banget nyakitin kamu buat kamu sedih yah maafin aku yah 💖";
const GIFT_PAGE_URL = "gift.html"; // <-- GANTI DENGAN NAMA FILE KADO ANDA!

// ROMANTIC_STORY_TEXTS digunakan untuk bagian awal chatbox
const ROMANTIC_STORY_TEXTS = [
    // PARAGRAF 1: (Sudah direvisi dan dirapikan)
    "Sayang, di hari spesialmu ini, aku ingin bilang yah Barakallah Fii Umrik yah Siti Ningrum Warida. Semoga dengan bertambahnya umur ini kamu dijadikan kepribadian baik lagi dari tahun sebelumnya.",

    // PARAGRAF 2: (Sudah direvisi dan dirapikan)
    "Kamu juga makin fokus untuk mengejar cita-cita kamu. Oh yah malah lupa, yang utama kamu makin taat beribadah yah, kamu jadi anak berbakti kepada orang tua dan jadi kakak yang terbaik buat Aci yah.",

    // PARAGRAF 3: (Sudah direvisi dan dirapikan)
    "Sejujurnya aku gak nyangka bisa sejauh ini sama kamu. Bahkan sampai detik ini, bisa kenal kamu pun masih terasa mimpi wkwkkwkwk, Tapi yang jelas aku sangat bersyukur bisa kenal sejauh ini sama kamu.",

    // PARAGRAF 4: (Sudah direvisi dan dirapikan)
    "Lebih lama lagi yah sama aku. Meskipun sifat aku kek gini, aku harap kamu bisa kuat wkwkkwkwk.",

    // PARAGRAF 5: PENUTUP UCAPAN (Sudah direvisi dan dirapikan)
    "Jadi intinya, pokoknya selamat ulang tahun yang ke-21 yah! Semoga makin bertumbuh menjadi kepribadian yang lebih baik lagi. ✨"
];
// ==========================================

// **PERBAIKAN:** Gunakan <br /><br /> untuk memisahkan paragraf di HTML
const fullStory = ROMANTIC_STORY_TEXTS.join("<br /><br />");

/**
 * Regex untuk menyatukan kembali tag <br /> yang terpisah oleh proses .split("") 
 * Contoh: <span>&lt;</span><span>b</span><span>r</span><span> </span><span>/</span><span>&gt;</span> menjadi <br />
 */
const brSplitRegex = /<span>&lt;<\/span>\s*<span>b<\/span><span>r<\/span>\s*<span>(\/)?<\/span>\s*<span>&gt;<\/span>/g;


// Fungsi untuk menganimasikan setiap kartu momen dengan efek ketik
const animateMomentCard = (tl, cardSelector, textSelector, duration = 4) => {
    // 1. Split teks untuk efek ketik
    const textElement = document.querySelector(textSelector);
    if (!textElement) return;

    // Ambil teks asli dan ganti line break \n menjadi <br />
    const originalText = textElement.innerText.replace(/\n/g, '<br />'); 
    
    // Split berdasarkan karakter, kecuali untuk tag <br />
    textElement.innerHTML = `<span>${originalText
        .split("")
        .join("</span><span>")}</span>`;
    
    // **SOLUSI** Satukan kembali tag <br /> yang terpisah
    textElement.innerHTML = textElement.innerHTML.replace(brSplitRegex, '<br />');

    // 2. Animasi Card Masuk
    tl.fromTo(cardSelector, 1.2, {
        opacity: 0,
        scale: 0.8,
        y: 50,
        rotation: 10
    }, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 0,
        ease: Elastic.easeOut.config(1, 0.5)
    }, "+=0.5")

    // 3. Efek Ketik (Typing Effect)
    .staggerTo(`${textSelector} span`, 2.5, {
        visibility: "visible",
    }, 0.03, "-=0.5") // Mulai efek ketik

    // 4. Animasi Card Keluar
    .to(cardSelector, 1, {
        opacity: 0,
        scale: 0.9,
        y: -50,
        rotation: -10,
        ease: Power2.easeIn
    }, `+=${duration}`); // Tahan selama 'duration' detik setelah teks selesai diketik
};


// Animation GSAP timeline
const animationTimeline = () => {
    // Ambil elemen teks utama
    const greetingText = document.getElementById("greetingText");
    const nameDisplay = document.getElementById("name");
    const wishText = document.querySelector(".wish-text");

    // SETEL NAMA DAN UCAPAN DARI VARIABEL
    nameDisplay.innerText = BDAY_NAME;
    wishText.innerHTML = HBD_WISH_TEXT.replace(/\n/g, '<br />'); // Atur baris baru

    // Dapatkan elemen chatbox dan setel kontennya menjadi cerita panjang
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    // **PENTING:** Gunakan fullStory yang sudah berisi <br /><br />
    textBoxChars.innerHTML = fullStory; 

    // split chars that needs to be animated individually
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    // Split untuk typing effect di chatbox awal
    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;
    
    // **SOLUSI**: Satukan kembali tag <br /> yang terpisah dengan regex robust
    textBoxChars.innerHTML = textBoxChars.innerHTML.replace(brSplitRegex, '<br />');
    
    // Split untuk animasi HBD
    hbd.innerHTML = `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg",
    };

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewY: "-15deg",
    };

    // animation timeline
    const tl = new TimelineMax();

    tl.to(".container", 0.6, {
        visibility: "visible",
    })
        .from(".one", 0.7, {
            opacity: 0,
            y: 10,
        })
        .from(".two", 0.4, {
            opacity: 0,
            y: 10,
        })
        .to(
            ".one",
            0.7,
            {
                opacity: 0,
                y: 10,
            },
            "+=3.5"
        )
        .to(
            ".two",
            0.7,
            {
                opacity: 0,
                y: 10,
            },
            "-=1"
        )
        .from(".three", 0.7, {
            opacity: 0,
            y: 10,
        })
        .to(
            ".three",
            0.7,
            {
                opacity: 0,
                y: 10,
            },
            "+=3"
        )
        .from(".four", 0.7, {
            scale: 0.2,
            opacity: 0,
        })
        .from(".fake-btn", 0.3, {
            scale: 0.2,
            opacity: 0,
        })
        .staggerTo(
            ".hbd-chatbox span",
            5.5, // Disesuaikan untuk teks yang lebih panjang
            {
                visibility: "visible",
            },
            0.03 // Disesuaikan delay antar huruf
        )
        .to(
            ".fake-btn",
            0.1,
            {
                backgroundColor: "#E89ADF", // Pink
            },
            "+=4"
        )
        .to(
            ".four",
            0.5,
            {
                scale: 0.2,
                opacity: 0,
                y: -150,
            },
            "+=1"
        )
        .from(".idea-1", 0.7, ideaTextTrans)
        .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-2", 0.7, ideaTextTrans)
        .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-3", 0.7, ideaTextTrans)
        .to(".idea-3 strong", 0.5, {
            scale: 1.1,
            x: 10,
            backgroundColor: "#E89ADF", // Pink
            color: "#fff",
        })
        .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-4", 0.7, ideaTextTrans)
        .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
        .from(
            ".idea-5",
            0.7,
            {
                rotationX: 15,
                rotationZ: -10,
                skewY: "-5deg",
                y: 50,
                z: 10,
                opacity: 0,
            },
            "+=1.5"
        )
        .to(
            ".idea-5 span",
            0.7,
            {
                rotation: 90,
                x: 8,
            },
            "+=1.4"
        )
        .to(
            ".idea-5",
            0.7,
            {
                scale: 0.2,
                opacity: 0,
            },
            "+=2"
        )
        
        // === START: ANIMASI MOMEN CARD ===
        animateMomentCard(tl, '.card-1', '.moment-text-1', 4);
        animateMomentCard(tl, '.card-2', '.moment-text-2', 4);
        animateMomentCard(tl, '.card-3', '.moment-text-3', 4);
        
        // Hapus Div Momen 
        tl.to(".moments", 0.5, { opacity: 0, zIndex: "-1" }, "-=1")
        // === END: ANIMASI MOMEN CARD ===
        
        .staggerFrom(
            ".idea-6 span",
            0.8,
            {
                scale: 3,
                opacity: 0,
                rotation: 15,
                ease: Expo.easeOut,
            },
            0.2
        )
        .staggerTo(
            ".idea-6 span",
            0.8,
            {
                scale: 3,
                opacity: 0,
                rotation: -15,
                ease: Expo.easeOut,
            },
            0.2,
            "+=1.5"
        )
        .staggerFromTo(
            ".ballons img",
            2.5,
            {
                opacity: 0.9,
                y: 1400,
            },
            {
                opacity: 1,
                y: -1000,
            },
            0.2
        )
        .from(
            ".profile-picture",
            0.5,
            {
                scale: 3.5,
                opacity: 0,
                x: 25,
                y: -25,
                rotationZ: -45,
            },
            "-=2"
        )
        .from(".hat", 0.5, {
            x: -100,
            y: 350,
            rotation: -180,
            opacity: 0,
        })
        .staggerFrom(
            ".wish-hbd span",
            0.7,
            {
                opacity: 0,
                y: -50,
                rotation: 150,
                skewX: "30deg",
                ease: Elastic.easeOut.config(1, 0.5),
            },
            0.1
        )
        .staggerFromTo(
            ".wish-hbd span",
            0.7,
            {
                scale: 1.4,
                rotationY: 150,
            },
            {
                scale: 1,
                rotationY: 0,
                color: "#ff69b4", // Pink cerah
                ease: Expo.easeOut,
            },
            0.1,
            "party"
        )
        .from(
            ".wish h5",
            0.5,
            {
                opacity: 0,
                y: 10,
                skewX: "-15deg",
            },
            "party"
        )
        .staggerTo(
            ".eight svg",
            1.5,
            {
                visibility: "visible",
                opacity: 0,
                scale: 80,
                repeat: 3,
                repeatDelay: 1.4,
            },
            0.3
        )
        .to(".six", 0.5, {
            opacity: 0,
            y: 30,
            zIndex: "-1",
        })
        .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
        
        // **Animasi munculnya tombol kado**
        .fromTo(
            "#giftButton", 
            0.8,
            { scale: 0.5, opacity: 0, rotation: -45 },
            { scale: 1, opacity: 1, rotation: 0, ease: Elastic.easeOut.config(1, 0.4) },
            "+=0.5"
        );


    // restart animation on click
    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        tl.restart();
    });
    
    // ===============================================
    // KLIK EMOTIKON MENUJU HALAMAN KADO
    // ===============================================
    const giftBtn = document.getElementById("giftButton");
    
    giftBtn.addEventListener("click", (e) => {
        e.preventDefault(); 
        
        // Hentikan musik dan animasi sebelum pindah
        document.querySelector(".song").pause();
        tl.pause(); 

        Swal.fire({
            title: 'Siap untuk kado?',
            text: "Klik Ya untuk melihat kado spesial dariku!",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#E89ADF',
            cancelButtonColor: '#AAAAAA',
            confirmButtonText: 'Ya! Aku Siap! 🎁',
            cancelButtonText: 'Tunggu, ulangi lagi',
        }).then((result) => {
            if (result.isConfirmed) {
                // Pindah ke halaman kado
                window.location.href = GIFT_PAGE_URL;
            } else {
                // Lanjutkan animasi atau mulai ulang jika dibatalkan
                tl.resume(); 
            }
        });
    });
};

// Animation GSAP timeline on load event
window.addEventListener("load", () => {
    // MODIFIKASI SWEETALERT KE BAHASA INDONESIA & WARNA PINK
    Swal.fire({
        title: "Mainkan musik dihari ulang tahunmu",
        text: "Pilih Ya untuk mendengarkan lagu ulang tahun spesial.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#E89ADF", // Warna pink kuat
        cancelButtonColor: "#AAAAAA",
        confirmButtonText: "Ya, putar musiknya!",
        cancelButtonText: "Tidak",
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector(".song").play();
            animationTimeline();
        } else {
            animationTimeline();
        }
    });
});