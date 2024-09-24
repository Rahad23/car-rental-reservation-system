import { GoDotFill } from "react-icons/go";

const ServiceOfTerms = () => {
  return (
    <div className="px-24 mt-10">
      <h1 className="text-2xl font-semibold text-gray-950">Terms of Service</h1>
      <div className="mt-3">
        <h1 className="text-gray-950 font-semibold">
          Last Updated{" "}
          <span className="text-xl font-semibold text-red-600">20/09/2024</span>
        </h1>
        <div className="mt-4">
          <p className="text-base font-semibold text-gray-950">
            <span className="text-lg font-bold">Welcome</span> to{" "}
            <span className="font-bold">AVIS car rental website</span>. These
            Terms of Service (“Terms”) govern your access to and use of our car
            rental services provided through{" "}
            <span className="font-bold">AVIS</span> (the "Service"). By using
            our Service, you agree to these Terms. If you do not agree, please
            do not use the Service.
          </p>
        </div>

        <div className="mt-6">
          <h1 className="text-gray-900 text-2xl font-bold">1. Eligibility</h1>
          <p className="text-lg text-gray-950 font-semibold mt-3">
            To use our Service, you must:
          </p>
          <ul className="mt-2">
            <li className="text-base font-semibold text-gray-950 flex items-center gap-x-1">
              <GoDotFill className=" text-gray-950" />
              Be at least 21 years old (or the legal driving age in your
              country).
            </li>
            <li className="text-base font-semibold text-gray-950 flex items-center gap-x-1">
              <GoDotFill className=" text-gray-950" />
              Hold a valid driver’s license..
            </li>
            <li className="text-base font-semibold text-gray-950 flex items-center gap-x-1">
              <GoDotFill className=" text-gray-950" />
              Provide a valid credit card for payment and deposit purposes.
            </li>
            <li className="text-base font-semibold text-gray-950 flex items-center gap-x-1">
              <GoDotFill className=" text-gray-950" />
              Agree to comply with all traffic laws and regulations.
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <h1 className="text-gray-900 text-2xl font-bold">
            2. Rental Process
          </h1>
          <ul className="mt-2">
            <li className="text-base font-semibold text-gray-950 flex items-center gap-x-2">
              <span>1.</span>
              <span className="text-lg text-gray-950 font-semibold">
                Reservation:
              </span>{" "}
              To rent a vehicle, you must complete the booking process on our
              website. Confirmation of your booking will be sent via email.
            </li>
            <li className="text-base font-semibold text-gray-950 flex items-center gap-x-2">
              <span>2.</span>
              <span className="text-lg text-gray-950 font-semibold">
                Identification:
              </span>{" "}
              You are required to provide valid identification, such as a
              driver’s license and credit card, when picking up the vehicle.
            </li>
            <li className="text-base font-semibold text-gray-950 ">
              <p>
                <span>3. </span>
                <span className="text-lg text-gray-950 font-semibold">
                  Vehicle Pickup and Return:
                </span>{" "}
                The vehicle must be picked up and returned at the agreed
                location and time. Any delay in returning the vehicle may result
                in additional fees.
              </p>
            </li>
            <li className="text-base font-semibold text-gray-950 flex items-center gap-x-2">
              <span>4.</span>
              <span className="text-lg text-gray-950 font-semibold">
                Security Deposit:
              </span>{" "}
              While returning the car through admin or you can pay from the
              website through Mobile Banking or Bank Card
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <h1 className="text-gray-900 text-2xl font-bold">
            3. Cancellations and Refunds
          </h1>

          <ul className="mt-2">
            <li className="text-base font-semibold text-gray-950 flex gap-x-1">
              <GoDotFill className=" text-gray-950 text-2xl" />
              <p>
                <span className="text-lg text-gray-950 font-semibold">
                  Cancellation Policy:
                </span>{" "}
                Cancellation Policy: You may cancel your reservation at least 24
                hours before the rental start date for a full refund.
                Cancellations made less than 24 hours in advance may be subject
                to a cancellation fee.
              </p>
            </li>
            <li className="text-base font-semibold text-gray-950 flex gap-x-1">
              <GoDotFill className=" text-gray-950 text-lg " />
              <p>
                <span className="text-lg text-gray-950 font-semibold">
                  Refunds:
                </span>{" "}
                Refunds are processed within 5-7 business days after
                cancellation or after the vehicle is returned in satisfactory
                condition.
              </p>
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <h1 className="text-gray-900 text-2xl font-bold">4. Privacy</h1>
          <p className="text-gray-950 text-base font-semibold">
            We collect personal information such as your name, contact details,
            and payment information in accordance with our [Privacy Policy].
            This information is used to process bookings and provide customer
            support.
          </p>
        </div>
        <div className="mt-6">
          <h1 className="text-gray-900 text-2xl font-bold">4. Contact Us</h1>
          <p className="text-gray-950 text-base font-semibold">
            If you have any questions regarding these Terms, please contact us
            at{" "}
            <span className="text-base font-semibold text-gray-950 border-b-[1px] border-gray-950">
              rahadhasan33675@gmail.com
            </span>{" "}
            or{" "}
            <span className="text-base font-semibold text-gray-950 border-b-[1px] border-gray-950">
              +88 01733675223
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceOfTerms;
