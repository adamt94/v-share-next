export default function ChatTab() {
  return (
    <>
      <div className="flex flex-col flex-grow h-0  overflow-auto p-4">
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
          <div>
            <div className="surface on-surface-text p-3 rounded-r-lg rounded-bl-lg">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <span className="text-xs outline-text leading-none">2 min ago</span>
          </div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="primary on-primary-text p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod.
              </p>
            </div>
            <span className="text-xs outline-text leading-none">2 min ago</span>
          </div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="primary on-primary-text p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
            <span className="text-xs outline-text leading-none">2 min ago</span>
          </div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
          <div>
            <div className="surface on-surface-text p-3 rounded-r-lg rounded-bl-lg">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </div>
            <span className="text-xs outline-text leading-none">2 min ago</span>
          </div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="primary on-primary-text p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </div>
            <span className="text-xs outline-text leading-none">2 min ago</span>
          </div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="primary on-primary-text p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <span className="text-xs outline-text leading-none">2 min ago</span>
          </div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="primary on-primary-text p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
            <span className="text-xs outline-text leading-none">2 min ago</span>
          </div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
          <div>
            <div className="surface on-surface-text p-3 rounded-r-lg rounded-bl-lg">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
            </div>
            <span className="text-xs outline-text leading-none">2 min ago</span>
          </div>
        </div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="primary on-primary-text p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">Lorem ipsum dolor sit.</p>
            </div>
            <span className="text-xs outline-text leading-none">2 min ago</span>
          </div>
        </div>
      </div>

      <div className="surface-1 p-4">
        <input
          className="flex items-center h-10 w-full rounded px-3 text-sm surface on-surface-text"
          type="text"
          placeholder="Type your message…"
        />
      </div>
    </>
  );
}
