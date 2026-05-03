import { FaEnvelopeOpenText } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white pt-5 pb-4 mt-5 border-top">
      <div className="container">
        <div className="row text-center text-md-end align-items-start">
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold mb-4 me-4">متواجدين دائماً لمساعدتك</h4>
            <div className="text-center p-5 rounded-4" style={{ border: "1px solid #ddd", minHeight: "100px" }}>
              <div className="mb-3" style={{ fontSize: "50px", color: "#78b933" }}>
                <FaEnvelopeOpenText />
              </div>
              <h5 className="fw-bold mt-3">تواصل معنا</h5>
            </div>
          </div>

          <div className="col-md-5 mb-4">
            <div className="px-md-4 text-center">
              <h5 className="fw-bold mb-2">خليك متابع كل جديد</h5>
              <p className="text-muted small mb-4">اشترك في النشرة الإخبارية ولا تفوتك العروض</p>
              <input
                type="email"
                className="form-control form-control-lg rounded-4 text-center border-2 mt-4"
                placeholder="أدخل بريدك الالكتروني"
                style={{ borderColor: "#78b933" }}
              />
              <button
                className="btn btn-lg w-100 rounded-4 text-white fw-bold py-3 mt-4"
                style={{ backgroundColor: "#78b933", border: "none" }}
              >
                اشترك الان
              </button>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-4 me-4">عن متجرنا</h5>
            <ul className="list-unstyled lh-lg">
              <li>تواصل معنا</li>
              <li>مقالات</li>
              <li>سياسية التبديل و الارجاع</li>
              <li>الشروط و الاحكام</li>
              <li>سياسية الاستخدام</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-5 pt-3 border-top text-muted small">
        © 2026 جميع الحقوق محفوظة لمتجر الأجهزة
      </div>
    </footer>
  );
};

export default Footer;