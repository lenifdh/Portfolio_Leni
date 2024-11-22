// Dynamic Text Animation
const dynamicText = document.querySelector('.dynamic-text');

// Array of words to animate
const words = ['Student', 'Information Technology', 'Freelance', 'Unemployment'];
let wordIndex = 0;

function typeEffect() {
  const currentWord = words[wordIndex];

  // Set the text content to the current word
  dynamicText.textContent = currentWord;

  // Add CSS class for pop-up effect
  dynamicText.classList.add('pop-up');
  
  // Loop to next word after the pop-up effect
  setTimeout(() => {
    dynamicText.classList.remove('pop-up'); // Remove pop-up effect class
    wordIndex = (wordIndex + 1) % words.length; // Loop to next word
    setTimeout(typeEffect, 1500); // Longer pause before showing next word
  }, 2000); // Longer duration to show the current word with the pop-up effect
}

// Start the animation
document.addEventListener('DOMContentLoaded', typeEffect);

// CSS for pop-up effect
const style = document.createElement('style');
style.textContent = `
  .dynamic-text {
    position: relative;
    display: inline-block;
    transition: all 0.5s ease;
  }
  .dynamic-text.pop-up {
    transform: translateY(-20px);
    opacity: 0;
  }
`;
const imageContainers = document.querySelectorAll('.image-container');

// // Fungsi untuk menghitung durasi animasi berdasarkan kecepatan scroll
// function calculateAnimationDuration(scrollSpeed) {
//   const minDuration = 1; // Durasi minimum (1 detik)
//   const maxDuration = 3; // Durasi maksimum (3 detik)
//   return Math.min(maxDuration, Math.max(minDuration, 3 / scrollSpeed)); // Konversi ke durasi dengan batas
// }

// let lastScrollY = 0;
// let lastTimestamp = 0;

// function handleScroll(event) {
//   const windowHeight = window.innerHeight;
//   const currentScrollY = window.scrollY;
//   const currentTimestamp = event.timeStamp;

//   // Hitung kecepatan scroll (delta posisi dibagi delta waktu)
//   const scrollDelta = Math.abs(currentScrollY - lastScrollY);
//   const timeDelta = currentTimestamp - lastTimestamp;
//   const scrollSpeed = scrollDelta / (timeDelta || 1); // Hindari pembagian oleh 0

//   const dynamicDuration = calculateAnimationDuration(scrollSpeed);

//   imageContainers.forEach(container => {
//     const rect = container.getBoundingClientRect();

//     if (rect.top <= windowHeight && rect.bottom >= 0) {
//       // Elemen terlihat, munculkan dengan animasi
//       container.style.animation = `slide-in-bottom ${dynamicDuration}s ease-in-out forwards`;
//     } else {
//       // Elemen keluar dari layar, sembunyikan dengan animasi
//       container.style.animation = `slide-out-bottom ${dynamicDuration}s ease-in-out forwards`;
//     }
//   });

//   // Perbarui posisi dan waktu scroll terakhir
//   lastScrollY = currentScrollY;
//   lastTimestamp = currentTimestamp;
// }

// // Jalankan saat halaman di-scroll
// window.addEventListener('scroll', handleScroll);

// // Jalankan animasi awal saat halaman dimuat
// document.addEventListener('DOMContentLoaded', () => {
//   handleScroll({ timeStamp: performance.now() });
// });


// document.addEventListener('DOMContentLoaded', () => {
//   const projectCards = document.querySelectorAll('.project-card');

//   projectCards.forEach((card, index) => {
//     card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`;
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const serviceContainer = document.querySelector('.new-container'); // Kontainer layanan
  const serviceCards = document.querySelectorAll('.service-card'); // Semua kartu layanan

  // Observer untuk memantau kontainer layanan
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Jika kontainer masuk viewport, tambahkan kelas "active" ke semua kartu
              serviceCards.forEach(card => card.classList.add('active'));
          } else {
              // Jika kontainer keluar viewport, hapus kelas "active"
              serviceCards.forEach(card => card.classList.remove('active'));
          }
      });
  }, { threshold: 0.3 }); // Threshold 30% kontainer terlihat

  observer.observe(serviceContainer); // Observasi kontainer layanan
});



document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineContents = document.querySelectorAll(".timeline-content");
  const bubbles = document.querySelectorAll(".bubble-number");

  // Intersection Observer untuk efek fade-in dan bubble
  const observerOptions = {
    root: null,
    threshold: 0.2,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  timelineItems.forEach((item) => observer.observe(item));
  bubbles.forEach((bubble) => observer.observe(bubble));

  // Toggle content saat diklik
  function toggleContent(element) {
    const isActive = element.classList.contains("active");
    timelineContents.forEach((content) => content.classList.remove("active"));
    if (!isActive) {
      element.classList.add("active");
    }
  }

  // Event listener untuk scroll
  function handleScroll() {
    timelineItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
        item.classList.add("in-view");
      } else {
        item.classList.remove("in-view");
      }
    });
  }

  // Event listeners
  window.toggleContent = toggleContent;
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Panggil sekali saat halaman dimuat
});


document.addEventListener('DOMContentLoaded', function () {
  const filterItems = document.querySelectorAll('.filter-item');
  const projects = document.querySelectorAll('.project');
  const portfolio = document.querySelector('.portfolio');

  // Fungsi untuk menampilkan dan memposisikan elemen
  function filterProjects(filter) {
    let visibleProjects = [];

    projects.forEach(project => {
      if (filter === 'all' || project.getAttribute('data-category') === filter) {
        project.classList.remove('hide'); // Hapus animasi menghilang
        project.classList.add('show'); // Tambahkan animasi muncul
        visibleProjects.push(project);
      } else {
        project.classList.remove('show'); // Hapus animasi muncul
        project.classList.add('hide'); // Tambahkan animasi menghilang
        setTimeout(() => {
          project.style.display = 'none'; // Sembunyikan setelah animasi selesai
        }, 700); // Waktu yang sama dengan durasi animasi
      }
    });

    // Penyesuaian tata letak grid
    if (visibleProjects.length === 1) {
      portfolio.classList.add('center'); // Aktifkan mode centering
    } else {
      portfolio.classList.remove('center'); // Kembalikan ke default
    }
  }

  // Tambahkan event listener ke tombol filter
  filterItems.forEach(item => {
    item.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      // Pastikan semua elemen terlihat sebelum memulai transisi
      projects.forEach(project => (project.style.display = 'block'));
      filterProjects(filter);
    });
  });

  // Trigger klik pada "All" button secara default
  document.querySelector('.filter-item[data-filter="all"]').click();

  // Intersection Observer untuk animasi saat proyek masuk viewport
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Tambahkan efek muncul
          observer.unobserve(entry.target); // Hentikan pengamatan setelah efek diterapkan
        }
      });
    },
    { threshold: 0.1 } // Memastikan 10% elemen terlihat sebelum animasi dimulai
  );

  // Pantau setiap proyek
  projects.forEach(project => {
    observer.observe(project);
  });
});

// // SweetAlert2 tema dark
// Swal.fire({
//   title: 'Your Title',
//   text: 'Your text',
//   background: '#000000', // Background hitam
//   color: '#ffffff', // Teks putih
//   confirmButtonColor: '#ffffff', // Warna teks tombol konfirmasi
//   confirmButtonText: 'OK'
// });


// Animasi masuk ketika user berada di content blog
document.addEventListener('DOMContentLoaded', () => {
  const blogContainer = document.querySelector('.blog-container');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        blogContainer.classList.add('visible');
      } else {
        blogContainer.classList.remove('visible');
      }
    });
  });
  observer.observe(blogContainer);
});

// Function to handle Read More with SweetAlert2 and comment form
document.querySelectorAll('.read-more').forEach(button => {
  button.addEventListener('click', (event) => {
    const card = event.target.closest('.blog-card');
    const title = card.getAttribute('data-title');
    const date = card.getAttribute('data-date');
    const author = card.getAttribute('data-author');
    const content = card.getAttribute('data-content');
    const image = card.getAttribute('data-image');
    const link = card.getAttribute('data-link');

    // SweetAlert2 Popup with Form
    Swal.fire({
      title: `<div style="font-size: 1.5rem;">${title}</div>`,
      html: `
        <div>
          <img src="${image}" alt="${title}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
          <p style="margin-top: 1rem; font-size: 0.9rem; color: #555;">
            <strong>${author}</strong> <span style="color: #888;">| ${date}</span>
          </p>
          <p style="font-size: 1rem; color: #333;">${content}</p>
          <a href="${link}" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #007bff; color: white; border-radius: 5px; text-decoration: none;">Read Full Blog</a>
          <hr>
          <h4>Leave a Comment</h4>
          <input id="swal-input-name" class="swal2-input" placeholder="Your Name">
          <input id="swal-input-email" class="swal2-input" placeholder="Your Email">
          <textarea id="swal-input-message" class="swal2-textarea" placeholder="Your Message"></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Close',
      preConfirm: () => {
        const name = document.getElementById('swal-input-name').value.trim();
        const email = document.getElementById('swal-input-email').value.trim();
        const message = document.getElementById('swal-input-message').value.trim();

        // Validation
        if (!name || !email || !message) {
          Swal.showValidationMessage('All fields are required.');
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
          Swal.showValidationMessage('Please enter a valid email address.');
          return false;
        }

        return { name, email, message };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle successful form submission
        Swal.fire({
          icon: 'success',
          title: 'Comment Submitted',
          text: `Thank you, ${result.value.name}! Your comment has been submitted.`,
          confirmButtonText: 'OK'
        });
      }
    });
  });
});
