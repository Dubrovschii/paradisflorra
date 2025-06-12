(function (React, adminjs, designSystem) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  const Edit = _ref => {
    let {
      property,
      record,
      onChange
    } = _ref;
    const {
      params
    } = record;
    const {
      custom
    } = property;
    const path = adminjs.flat.get(params, custom.filePathProperty);
    const key = adminjs.flat.get(params, custom.keyProperty);
    const file = adminjs.flat.get(params, custom.fileProperty);
    const [originalKey, setOriginalKey] = React.useState(key);
    const [filesToUpload, setFilesToUpload] = React.useState([]);
    React.useEffect(() => {
      // it means means that someone hit save and new file has been uploaded
      // in this case fliesToUpload should be cleared.
      // This happens when user turns off redirect after new/edit
      if (typeof key === 'string' && key !== originalKey || typeof key !== 'string' && !originalKey || typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length) {
        setOriginalKey(key);
        setFilesToUpload([]);
      }
    }, [key, originalKey]);
    const onUpload = files => {
      setFilesToUpload(files);
      onChange(custom.fileProperty, files);
    };
    const handleRemove = () => {
      onChange(custom.fileProperty, null);
    };
    const handleMultiRemove = singleKey => {
      const index = (adminjs.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
      const filesToDelete = adminjs.flat.get(record.params, custom.filesToDeleteProperty) || [];
      if (path && path.length > 0) {
        const newPath = path.map((currentPath, i) => i !== index ? currentPath : null);
        let newParams = adminjs.flat.set(record.params, custom.filesToDeleteProperty, [...filesToDelete, index]);
        newParams = adminjs.flat.set(newParams, custom.filePathProperty, newPath);
        onChange(_objectSpread2(_objectSpread2({}, record), {}, {
          params: newParams
        }));
      } else {
        // eslint-disable-next-line no-console
        console.log('You cannot remove file when there are no uploaded files yet');
      }
    };
    return /*#__PURE__*/React__default["default"].createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default["default"].createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default["default"].createElement(designSystem.DropZone, {
      onChange: onUpload,
      multiple: custom.multiple,
      validate: {
        mimeTypes: custom.mimeTypes,
        maxSize: custom.maxSize
      },
      files: filesToUpload
    }), !custom.multiple && key && path && !filesToUpload.length && file !== null && /*#__PURE__*/React__default["default"].createElement(designSystem.DropZoneItem, {
      filename: key,
      src: path,
      onRemove: handleRemove
    }), custom.multiple && key && key.length && path ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, key.map((singleKey, index) => {
      // when we remove items we set only path index to nulls.
      // key is still there. This is because
      // we have to maintain all the indexes. So here we simply filter out elements which
      // were removed and display only what was left
      const currentPath = path[index];
      return currentPath ? /*#__PURE__*/React__default["default"].createElement(designSystem.DropZoneItem, {
        key: singleKey,
        filename: singleKey,
        src: path[index],
        onRemove: () => handleMultiRemove(singleKey)
      }) : '';
    })) : '');
  };

  const AudioMimeTypes = ['audio/aac', 'audio/midi', 'audio/x-midi', 'audio/mpeg', 'audio/ogg', 'application/ogg', 'audio/opus', 'audio/wav', 'audio/webm', 'audio/3gpp2'];
  const ImageMimeTypes = ['image/bmp', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/vnd.microsoft.icon', 'image/tiff', 'image/webp'];

  // eslint-disable-next-line import/no-extraneous-dependencies
  const SingleFile = props => {
    const {
      name,
      path,
      mimeType,
      width
    } = props;
    if (path && path.length) {
      if (mimeType && ImageMimeTypes.includes(mimeType)) {
        return /*#__PURE__*/React__default["default"].createElement("img", {
          src: path,
          style: {
            maxHeight: width,
            maxWidth: width
          },
          alt: name
        });
      }
      if (mimeType && AudioMimeTypes.includes(mimeType)) {
        return /*#__PURE__*/React__default["default"].createElement("audio", {
          controls: true,
          src: path
        }, "Your browser does not support the", /*#__PURE__*/React__default["default"].createElement("code", null, "audio"), /*#__PURE__*/React__default["default"].createElement("track", {
          kind: "captions"
        }));
      }
    }
    return /*#__PURE__*/React__default["default"].createElement(designSystem.Box, null, /*#__PURE__*/React__default["default"].createElement(designSystem.Button, {
      as: "a",
      href: path,
      ml: "default",
      size: "sm",
      rounded: true,
      target: "_blank"
    }, /*#__PURE__*/React__default["default"].createElement(designSystem.Icon, {
      icon: "DocumentDownload",
      color: "white",
      mr: "default"
    }), name));
  };
  const File = _ref => {
    let {
      width,
      record,
      property
    } = _ref;
    const {
      custom
    } = property;
    let path = adminjs.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.filePathProperty);
    if (!path) {
      return null;
    }
    const name = adminjs.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
    const mimeType = custom.mimeTypeProperty && adminjs.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.mimeTypeProperty);
    if (!property.custom.multiple) {
      if (custom.opts && custom.opts.baseUrl) {
        path = "".concat(custom.opts.baseUrl, "/").concat(name);
      }
      return /*#__PURE__*/React__default["default"].createElement(SingleFile, {
        path: path,
        name: name,
        width: width,
        mimeType: mimeType
      });
    }
    if (custom.opts && custom.opts.baseUrl) {
      const baseUrl = custom.opts.baseUrl || '';
      path = path.map((singlePath, index) => "".concat(baseUrl, "/").concat(name[index]));
    }
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, path.map((singlePath, index) => /*#__PURE__*/React__default["default"].createElement(SingleFile, {
      key: singlePath,
      path: singlePath,
      name: name[index],
      width: width,
      mimeType: mimeType[index]
    })));
  };

  const List = props => /*#__PURE__*/React__default["default"].createElement(File, _extends({
    width: 100
  }, props));

  const Show = props => {
    const {
      property
    } = props;
    return /*#__PURE__*/React__default["default"].createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default["default"].createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default["default"].createElement(File, _extends({
      width: "100%"
    }, props)));
  };

  const UploadPhoto = props => {
    React.useEffect(() => {
      const api = new adminjs.ApiClient();
      console.log("useeff is running");
      api.resourceAction({
        resourceId: "Product",
        actionName: "list"
      }).then(results => {
        console.log(results);
      }, []);
    });
    return /*#__PURE__*/React__default["default"].createElement(designSystem.Box, null, /*#__PURE__*/React__default["default"].createElement("h1", {
      className: "admin__title"
    }, "Bun venit pe AdminPanel, drag\u0103 Administratorule!"));
  };

  const OrderItemsShow = _ref => {
    let {
      record
    } = _ref;
    const params = (record === null || record === void 0 ? void 0 : record.params) || {};
    const itemsData = [];
    let index = 0;
    while (params["items.".concat(index, ".product_id")] !== undefined) {
      itemsData.push({
        product_id: params["items.".concat(index, ".product_id")],
        product_name: params["items.".concat(index, ".product_name")],
        quantity: params["items.".concat(index, ".quantity")],
        price: params["items.".concat(index, ".price")]
      });
      index++;
    }
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "order-items-show",
      style: {
        backgroundColor: "#f0f0f0",
        padding: "1rem",
        borderRadius: "4px"
      }
    }, /*#__PURE__*/React__default["default"].createElement("h3", null, "Articole \xEEn ordine:"), itemsData.length > 0 ? itemsData.map((item, idx) => /*#__PURE__*/React__default["default"].createElement("di", {
      key: idx,
      className: "order-item",
      style: {
        marginBottom: "1rem",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px"
      }
    }, /*#__PURE__*/React__default["default"].createElement("p", null, /*#__PURE__*/React__default["default"].createElement("strong", null, "Nume:"), " ", item.product_name), /*#__PURE__*/React__default["default"].createElement("p", null, /*#__PURE__*/React__default["default"].createElement("strong", null, "ID:"), " ", item.product_id), /*#__PURE__*/React__default["default"].createElement("p", null, /*#__PURE__*/React__default["default"].createElement("strong", null, "Cantitate:"), " ", item.quantity), /*#__PURE__*/React__default["default"].createElement("p", null, /*#__PURE__*/React__default["default"].createElement("strong", null, "Pre\u0163:"), " ", item.price))) : /*#__PURE__*/React__default["default"].createElement("p", null, "\u2014 Nu exist\u0103 produse \xEEn comand\u0103 \u2014"));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Component0 = Edit;
  AdminJS.UserComponents.Component1 = List;
  AdminJS.UserComponents.Component2 = Show;
  AdminJS.UserComponents.Component3 = Edit;
  AdminJS.UserComponents.Component4 = List;
  AdminJS.UserComponents.Component5 = Show;
  AdminJS.UserComponents.Component6 = Edit;
  AdminJS.UserComponents.Component7 = List;
  AdminJS.UserComponents.Component8 = Show;
  AdminJS.UserComponents.Component9 = Edit;
  AdminJS.UserComponents.Component10 = List;
  AdminJS.UserComponents.Component11 = Show;
  AdminJS.UserComponents.Component12 = Edit;
  AdminJS.UserComponents.Component13 = List;
  AdminJS.UserComponents.Component14 = Show;
  AdminJS.UserComponents.Component15 = Edit;
  AdminJS.UserComponents.Component16 = List;
  AdminJS.UserComponents.Component17 = Show;
  AdminJS.UserComponents.Dashboard = UploadPhoto;
  AdminJS.UserComponents.OrderItemsShow = OrderItemsShow;

})(React, AdminJS, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2VkaXQudHN4IiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvdHlwZXMvbWltZS10eXBlcy50eXBlLnRzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9maWxlLnRzeCIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdC50c3giLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL3Nob3cudHN4IiwiLi4vYWRtaW5PcHRpb25zL2NvbXBvbmVudHMvaW1hZ2VBZGQuanN4IiwiLi4vYWRtaW5PcHRpb25zL2NvbXBvbmVudHMvT3JkZXJJdGVtc1Nob3cuanN4IiwiLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBGQywgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRWRpdFByb3BlcnR5UHJvcHMsIGZsYXQgfSBmcm9tICdhZG1pbmpzJ1xuaW1wb3J0IHsgRHJvcFpvbmUsIEZvcm1Hcm91cCwgTGFiZWwsIERyb3Bab25lSXRlbSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nXG5pbXBvcnQgUHJvcGVydHlDdXN0b20gZnJvbSAnLi4vdHlwZXMvcHJvcGVydHktY3VzdG9tLnR5cGUnXG5cbmNvbnN0IEVkaXQ6IEZDPEVkaXRQcm9wZXJ0eVByb3BzPiA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcbiAgY29uc3QgeyBwYXJhbXMgfSA9IHJlY29yZFxuICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHkgYXMgdW5rbm93biBhcyB7IGN1c3RvbTogUHJvcGVydHlDdXN0b20gfVxuXG4gIGNvbnN0IHBhdGggPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5KVxuICBjb25zdCBrZXkgPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5rZXlQcm9wZXJ0eSlcbiAgY29uc3QgZmlsZSA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmZpbGVQcm9wZXJ0eSlcblxuICBjb25zdCBbb3JpZ2luYWxLZXksIHNldE9yaWdpbmFsS2V5XSA9IHVzZVN0YXRlKGtleSlcbiAgY29uc3QgW2ZpbGVzVG9VcGxvYWQsIHNldEZpbGVzVG9VcGxvYWRdID0gdXNlU3RhdGU8QXJyYXk8RmlsZT4+KFtdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gaXQgbWVhbnMgbWVhbnMgdGhhdCBzb21lb25lIGhpdCBzYXZlIGFuZCBuZXcgZmlsZSBoYXMgYmVlbiB1cGxvYWRlZFxuICAgIC8vIGluIHRoaXMgY2FzZSBmbGllc1RvVXBsb2FkIHNob3VsZCBiZSBjbGVhcmVkLlxuICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIHVzZXIgdHVybnMgb2ZmIHJlZGlyZWN0IGFmdGVyIG5ldy9lZGl0XG4gICAgaWYgKFxuICAgICAgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnICYmIGtleSAhPT0gb3JpZ2luYWxLZXkpXG4gICAgICB8fCAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgJiYgIW9yaWdpbmFsS2V5KVxuICAgICAgfHwgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnICYmIEFycmF5LmlzQXJyYXkoa2V5KSAmJiBrZXkubGVuZ3RoICE9PSBvcmlnaW5hbEtleS5sZW5ndGgpXG4gICAgKSB7XG4gICAgICBzZXRPcmlnaW5hbEtleShrZXkpXG4gICAgICBzZXRGaWxlc1RvVXBsb2FkKFtdKVxuICAgIH1cbiAgfSwgW2tleSwgb3JpZ2luYWxLZXldKVxuXG4gIGNvbnN0IG9uVXBsb2FkID0gKGZpbGVzOiBBcnJheTxGaWxlPik6IHZvaWQgPT4ge1xuICAgIHNldEZpbGVzVG9VcGxvYWQoZmlsZXMpXG4gICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgZmlsZXMpXG4gIH1cblxuICBjb25zdCBoYW5kbGVSZW1vdmUgPSAoKSA9PiB7XG4gICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgbnVsbClcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZU11bHRpUmVtb3ZlID0gKHNpbmdsZUtleSkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gKGZsYXQuZ2V0KHJlY29yZC5wYXJhbXMsIGN1c3RvbS5rZXlQcm9wZXJ0eSkgfHwgW10pLmluZGV4T2Yoc2luZ2xlS2V5KVxuICAgIGNvbnN0IGZpbGVzVG9EZWxldGUgPSBmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5KSB8fCBbXVxuICAgIGlmIChcbiAgICAgIHBhdGggJiYgcGF0aC5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5tYXAoKGN1cnJlbnRQYXRoLCBpKSA9PiAoaSAhPT0gaW5kZXggPyBjdXJyZW50UGF0aCA6IG51bGwpKVxuICAgICAgbGV0IG5ld1BhcmFtcyA9IGZsYXQuc2V0KFxuICAgICAgICByZWNvcmQucGFyYW1zLFxuICAgICAgICBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5LFxuICAgICAgICBbLi4uZmlsZXNUb0RlbGV0ZSwgaW5kZXhdLFxuICAgICAgKVxuICAgICAgbmV3UGFyYW1zID0gZmxhdC5zZXQobmV3UGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSwgbmV3UGF0aClcblxuICAgICAgb25DaGFuZ2Uoe1xuICAgICAgICAuLi5yZWNvcmQsXG4gICAgICAgIHBhcmFtczogbmV3UGFyYW1zLFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKCdZb3UgY2Fubm90IHJlbW92ZSBmaWxlIHdoZW4gdGhlcmUgYXJlIG5vIHVwbG9hZGVkIGZpbGVzIHlldCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Rm9ybUdyb3VwPlxuICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxuICAgICAgPERyb3Bab25lXG4gICAgICAgIG9uQ2hhbmdlPXtvblVwbG9hZH1cbiAgICAgICAgbXVsdGlwbGU9e2N1c3RvbS5tdWx0aXBsZX1cbiAgICAgICAgdmFsaWRhdGU9e3tcbiAgICAgICAgICBtaW1lVHlwZXM6IGN1c3RvbS5taW1lVHlwZXMgYXMgQXJyYXk8c3RyaW5nPixcbiAgICAgICAgICBtYXhTaXplOiBjdXN0b20ubWF4U2l6ZSxcbiAgICAgICAgfX1cbiAgICAgICAgZmlsZXM9e2ZpbGVzVG9VcGxvYWR9XG4gICAgICAvPlxuICAgICAgeyFjdXN0b20ubXVsdGlwbGUgJiYga2V5ICYmIHBhdGggJiYgIWZpbGVzVG9VcGxvYWQubGVuZ3RoICYmIGZpbGUgIT09IG51bGwgJiYgKFxuICAgICAgICA8RHJvcFpvbmVJdGVtIGZpbGVuYW1lPXtrZXl9IHNyYz17cGF0aH0gb25SZW1vdmU9e2hhbmRsZVJlbW92ZX0gLz5cbiAgICAgICl9XG4gICAgICB7Y3VzdG9tLm11bHRpcGxlICYmIGtleSAmJiBrZXkubGVuZ3RoICYmIHBhdGggPyAoXG4gICAgICAgIDw+XG4gICAgICAgICAge2tleS5tYXAoKHNpbmdsZUtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIHdoZW4gd2UgcmVtb3ZlIGl0ZW1zIHdlIHNldCBvbmx5IHBhdGggaW5kZXggdG8gbnVsbHMuXG4gICAgICAgICAgICAvLyBrZXkgaXMgc3RpbGwgdGhlcmUuIFRoaXMgaXMgYmVjYXVzZVxuICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byBtYWludGFpbiBhbGwgdGhlIGluZGV4ZXMuIFNvIGhlcmUgd2Ugc2ltcGx5IGZpbHRlciBvdXQgZWxlbWVudHMgd2hpY2hcbiAgICAgICAgICAgIC8vIHdlcmUgcmVtb3ZlZCBhbmQgZGlzcGxheSBvbmx5IHdoYXQgd2FzIGxlZnRcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gcGF0aFtpbmRleF1cbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGF0aCA/IChcbiAgICAgICAgICAgICAgPERyb3Bab25lSXRlbVxuICAgICAgICAgICAgICAgIGtleT17c2luZ2xlS2V5fVxuICAgICAgICAgICAgICAgIGZpbGVuYW1lPXtzaW5nbGVLZXl9XG4gICAgICAgICAgICAgICAgc3JjPXtwYXRoW2luZGV4XX1cbiAgICAgICAgICAgICAgICBvblJlbW92ZT17KCkgPT4gaGFuZGxlTXVsdGlSZW1vdmUoc2luZ2xlS2V5KX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAnJ1xuICAgICAgICAgIH0pfVxuICAgICAgICA8Lz5cbiAgICAgICkgOiAnJ31cbiAgICA8L0Zvcm1Hcm91cD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBFZGl0XG4iLCJleHBvcnQgY29uc3QgQXVkaW9NaW1lVHlwZXMgPSBbXG4gICdhdWRpby9hYWMnLFxuICAnYXVkaW8vbWlkaScsXG4gICdhdWRpby94LW1pZGknLFxuICAnYXVkaW8vbXBlZycsXG4gICdhdWRpby9vZ2cnLFxuICAnYXBwbGljYXRpb24vb2dnJyxcbiAgJ2F1ZGlvL29wdXMnLFxuICAnYXVkaW8vd2F2JyxcbiAgJ2F1ZGlvL3dlYm0nLFxuICAnYXVkaW8vM2dwcDInLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgVmlkZW9NaW1lVHlwZXMgPSBbXG4gICd2aWRlby94LW1zdmlkZW8nLFxuICAndmlkZW8vbXBlZycsXG4gICd2aWRlby9vZ2cnLFxuICAndmlkZW8vbXAydCcsXG4gICd2aWRlby93ZWJtJyxcbiAgJ3ZpZGVvLzNncHAnLFxuICAndmlkZW8vM2dwcDInLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgSW1hZ2VNaW1lVHlwZXMgPSBbXG4gICdpbWFnZS9ibXAnLFxuICAnaW1hZ2UvZ2lmJyxcbiAgJ2ltYWdlL2pwZWcnLFxuICAnaW1hZ2UvcG5nJyxcbiAgJ2ltYWdlL3N2Zyt4bWwnLFxuICAnaW1hZ2Uvdm5kLm1pY3Jvc29mdC5pY29uJyxcbiAgJ2ltYWdlL3RpZmYnLFxuICAnaW1hZ2Uvd2VicCcsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBDb21wcmVzc2VkTWltZVR5cGVzID0gW1xuICAnYXBwbGljYXRpb24veC1iemlwJyxcbiAgJ2FwcGxpY2F0aW9uL3gtYnppcDInLFxuICAnYXBwbGljYXRpb24vZ3ppcCcsXG4gICdhcHBsaWNhdGlvbi9qYXZhLWFyY2hpdmUnLFxuICAnYXBwbGljYXRpb24veC10YXInLFxuICAnYXBwbGljYXRpb24vemlwJyxcbiAgJ2FwcGxpY2F0aW9uL3gtN3otY29tcHJlc3NlZCcsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBEb2N1bWVudE1pbWVUeXBlcyA9IFtcbiAgJ2FwcGxpY2F0aW9uL3gtYWJpd29yZCcsXG4gICdhcHBsaWNhdGlvbi94LWZyZWVhcmMnLFxuICAnYXBwbGljYXRpb24vdm5kLmFtYXpvbi5lYm9vaycsXG4gICdhcHBsaWNhdGlvbi9tc3dvcmQnLFxuICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnQnLFxuICAnYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3QnLFxuICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb24nLFxuICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5zcHJlYWRzaGVldCcsXG4gICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnRleHQnLFxuICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQnLFxuICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnByZXNlbnRhdGlvbicsXG4gICdhcHBsaWNhdGlvbi92bmQucmFyJyxcbiAgJ2FwcGxpY2F0aW9uL3J0ZicsXG4gICdhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwnLFxuICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgVGV4dE1pbWVUeXBlcyA9IFtcbiAgJ3RleHQvY3NzJyxcbiAgJ3RleHQvY3N2JyxcbiAgJ3RleHQvaHRtbCcsXG4gICd0ZXh0L2NhbGVuZGFyJyxcbiAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgJ2FwcGxpY2F0aW9uL2xkK2pzb24nLFxuICAndGV4dC9qYXZhc2NyaXB0JyxcbiAgJ3RleHQvcGxhaW4nLFxuICAnYXBwbGljYXRpb24veGh0bWwreG1sJyxcbiAgJ2FwcGxpY2F0aW9uL3htbCcsXG4gICd0ZXh0L3htbCcsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBCaW5hcnlEb2NzTWltZVR5cGVzID0gW1xuICAnYXBwbGljYXRpb24vZXB1Yit6aXAnLFxuICAnYXBwbGljYXRpb24vcGRmJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IEZvbnRNaW1lVHlwZXMgPSBbXG4gICdmb250L290ZicsXG4gICdmb250L3R0ZicsXG4gICdmb250L3dvZmYnLFxuICAnZm9udC93b2ZmMicsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBPdGhlck1pbWVUeXBlcyA9IFtcbiAgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG4gICdhcHBsaWNhdGlvbi94LWNzaCcsXG4gICdhcHBsaWNhdGlvbi92bmQuYXBwbGUuaW5zdGFsbGVyK3htbCcsXG4gICdhcHBsaWNhdGlvbi94LWh0dHBkLXBocCcsXG4gICdhcHBsaWNhdGlvbi94LXNoJyxcbiAgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyxcbiAgJ3ZuZC52aXNpbycsXG4gICdhcHBsaWNhdGlvbi92bmQubW96aWxsYS54dWwreG1sJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IE1pbWVUeXBlcyA9IFtcbiAgLi4uQXVkaW9NaW1lVHlwZXMsXG4gIC4uLlZpZGVvTWltZVR5cGVzLFxuICAuLi5JbWFnZU1pbWVUeXBlcyxcbiAgLi4uQ29tcHJlc3NlZE1pbWVUeXBlcyxcbiAgLi4uRG9jdW1lbnRNaW1lVHlwZXMsXG4gIC4uLlRleHRNaW1lVHlwZXMsXG4gIC4uLkJpbmFyeURvY3NNaW1lVHlwZXMsXG4gIC4uLk90aGVyTWltZVR5cGVzLFxuICAuLi5Gb250TWltZVR5cGVzLFxuICAuLi5PdGhlck1pbWVUeXBlcyxcbl1cblxudHlwZSBQb3B1bGFyTWltZVR5cGVzID0gdHlwZW9mIE1pbWVUeXBlc1tudW1iZXJdXG5cbmV4cG9ydCB0eXBlIE1pbWVUeXBlID0gUG9wdWxhck1pbWVUeXBlcyB8IHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nXG59XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSWNvbiB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nXG5pbXBvcnQgeyBmbGF0LCBTaG93UHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnXG5pbXBvcnQgUmVhY3QsIHsgRkMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEF1ZGlvTWltZVR5cGVzLCBJbWFnZU1pbWVUeXBlcyB9IGZyb20gJy4uL3R5cGVzL21pbWUtdHlwZXMudHlwZSdcbmltcG9ydCBQcm9wZXJ0eUN1c3RvbSBmcm9tICcuLi90eXBlcy9wcm9wZXJ0eS1jdXN0b20udHlwZSdcblxudHlwZSBQcm9wcyA9IFNob3dQcm9wZXJ0eVByb3BzICYge1xuICB3aWR0aD86IG51bWJlciB8IHN0cmluZztcbn07XG5cbnR5cGUgU2luZ2xlRmlsZVByb3BzID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIG1pbWVUeXBlPzogc3RyaW5nO1xuICB3aWR0aD86IG51bWJlciB8IHN0cmluZztcbn07XG5cbmNvbnN0IFNpbmdsZUZpbGU6IEZDPFNpbmdsZUZpbGVQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBuYW1lLCBwYXRoLCBtaW1lVHlwZSwgd2lkdGggfSA9IHByb3BzXG5cbiAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGgpIHtcbiAgICBpZiAobWltZVR5cGUgJiYgSW1hZ2VNaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUgYXMgYW55KSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGltZ1xuICAgICAgICAgIHNyYz17cGF0aH1cbiAgICAgICAgICBzdHlsZT17eyBtYXhIZWlnaHQ6IHdpZHRoLCBtYXhXaWR0aDogd2lkdGggfX1cbiAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgIC8+XG4gICAgICApXG4gICAgfVxuICAgIGlmIChtaW1lVHlwZSAmJiBBdWRpb01pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSBhcyBhbnkpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YXVkaW8gY29udHJvbHMgc3JjPXtwYXRofT5cbiAgICAgICAgICBZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGVcbiAgICAgICAgICA8Y29kZT5hdWRpbzwvY29kZT5cbiAgICAgICAgICA8dHJhY2sga2luZD1cImNhcHRpb25zXCIgLz5cbiAgICAgICAgPC9hdWRpbz5cbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8Qm94PlxuICAgICAgPEJ1dHRvbiBhcz1cImFcIiBocmVmPXtwYXRofSBtbD1cImRlZmF1bHRcIiBzaXplPVwic21cIiByb3VuZGVkIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICA8SWNvbiBpY29uPVwiRG9jdW1lbnREb3dubG9hZFwiIGNvbG9yPVwid2hpdGVcIiBtcj1cImRlZmF1bHRcIiAvPlxuICAgICAgICB7bmFtZX1cbiAgICAgIDwvQnV0dG9uPlxuICAgIDwvQm94PlxuICApXG59XG5cbmNvbnN0IEZpbGU6IEZDPFByb3BzPiA9ICh7IHdpZHRoLCByZWNvcmQsIHByb3BlcnR5IH0pID0+IHtcbiAgY29uc3QgeyBjdXN0b20gfSA9IHByb3BlcnR5IGFzIHVua25vd24gYXMgeyBjdXN0b206IFByb3BlcnR5Q3VzdG9tIH1cblxuICBsZXQgcGF0aCA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSlcblxuICBpZiAoIXBhdGgpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY29uc3QgbmFtZSA9IGZsYXQuZ2V0KFxuICAgIHJlY29yZD8ucGFyYW1zLFxuICAgIGN1c3RvbS5maWxlTmFtZVByb3BlcnR5ID8gY3VzdG9tLmZpbGVOYW1lUHJvcGVydHkgOiBjdXN0b20ua2V5UHJvcGVydHksXG4gIClcblxuICBjb25zdCBtaW1lVHlwZSA9IGN1c3RvbS5taW1lVHlwZVByb3BlcnR5XG4gICAgJiYgZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5taW1lVHlwZVByb3BlcnR5KVxuXG4gIGlmICghcHJvcGVydHkuY3VzdG9tLm11bHRpcGxlKSB7XG4gICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgIHBhdGggPSBgJHtjdXN0b20ub3B0cy5iYXNlVXJsfS8ke25hbWV9YFxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPFNpbmdsZUZpbGUgcGF0aD17cGF0aH0gbmFtZT17bmFtZX0gd2lkdGg9e3dpZHRofSBtaW1lVHlwZT17bWltZVR5cGV9IC8+XG4gICAgKVxuICB9XG4gIGlmIChjdXN0b20ub3B0cyAmJiBjdXN0b20ub3B0cy5iYXNlVXJsKSB7XG4gICAgY29uc3QgYmFzZVVybCA9IGN1c3RvbS5vcHRzLmJhc2VVcmwgfHwgJydcbiAgICBwYXRoID0gcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiBgJHtiYXNlVXJsfS8ke25hbWVbaW5kZXhdfWApXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7cGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiAoXG4gICAgICAgIDxTaW5nbGVGaWxlXG4gICAgICAgICAga2V5PXtzaW5nbGVQYXRofVxuICAgICAgICAgIHBhdGg9e3NpbmdsZVBhdGh9XG4gICAgICAgICAgbmFtZT17bmFtZVtpbmRleF19XG4gICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgIG1pbWVUeXBlPXttaW1lVHlwZVtpbmRleF19XG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICA8Lz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBGaWxlXG4iLCJpbXBvcnQgUmVhY3QsIHsgRkMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFNob3dQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcydcblxuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlJ1xuXG5jb25zdCBMaXN0OiBGQzxTaG93UHJvcGVydHlQcm9wcz4gPSAocHJvcHMpID0+ICg8RmlsZSB3aWR0aD17MTAwfSB7Li4ucHJvcHN9IC8+KVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0XG4iLCJpbXBvcnQgUmVhY3QsIHsgRkMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFNob3dQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcydcbmltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJ1xuXG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUnXG5cbmNvbnN0IFNob3c6IEZDPFNob3dQcm9wZXJ0eVByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHByb3BlcnR5IH0gPSBwcm9wc1xuXG4gIHJldHVybiAoXG4gICAgPEZvcm1Hcm91cD5cbiAgICAgIDxMYWJlbD57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cbiAgICAgIDxGaWxlIHdpZHRoPVwiMTAwJVwiIHsuLi5wcm9wc30gLz5cbiAgICA8L0Zvcm1Hcm91cD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaG93XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbi8vIGltcG9ydCB7IERyb3Bab25lLCBMYWJlbCwgQm94LCBmb250U2l6ZXMgfSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBCb3ggfSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tIFwiYWRtaW5qc1wiO1xyXG5jb25zdCBVcGxvYWRQaG90byA9IChwcm9wcykgPT4ge1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcbiAgICBjb25zb2xlLmxvZyhcInVzZWVmZiBpcyBydW5uaW5nXCIpO1xyXG4gICAgYXBpXHJcbiAgICAgIC5yZXNvdXJjZUFjdGlvbih7IHJlc291cmNlSWQ6IFwiUHJvZHVjdFwiLCBhY3Rpb25OYW1lOiBcImxpc3RcIiB9KVxyXG4gICAgICAudGhlbigocmVzdWx0cykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xyXG4gICAgICB9LCBbXSk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94PlxyXG4gICAgICA8aDEgY2xhc3NOYW1lPVwiYWRtaW5fX3RpdGxlXCI+XHJcbiAgICAgICAgQnVuIHZlbml0IHBlIEFkbWluUGFuZWwsIGRyYWfEgyBBZG1pbmlzdHJhdG9ydWxlIVxyXG4gICAgICA8L2gxPlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVwbG9hZFBob3RvO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IE9yZGVySXRlbXNTaG93ID0gKHsgcmVjb3JkIH0pID0+IHtcbiAgY29uc3QgcGFyYW1zID0gcmVjb3JkPy5wYXJhbXMgfHwge307XG5cbiAgY29uc3QgaXRlbXNEYXRhID0gW107XG4gIGxldCBpbmRleCA9IDA7XG4gIHdoaWxlIChwYXJhbXNbYGl0ZW1zLiR7aW5kZXh9LnByb2R1Y3RfaWRgXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaXRlbXNEYXRhLnB1c2goe1xuICAgICAgcHJvZHVjdF9pZDogcGFyYW1zW2BpdGVtcy4ke2luZGV4fS5wcm9kdWN0X2lkYF0sXG4gICAgICBwcm9kdWN0X25hbWU6IHBhcmFtc1tgaXRlbXMuJHtpbmRleH0ucHJvZHVjdF9uYW1lYF0sXG4gICAgICBxdWFudGl0eTogcGFyYW1zW2BpdGVtcy4ke2luZGV4fS5xdWFudGl0eWBdLFxuICAgICAgcHJpY2U6IHBhcmFtc1tgaXRlbXMuJHtpbmRleH0ucHJpY2VgXSxcbiAgICB9KTtcbiAgICBpbmRleCsrO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9XCJvcmRlci1pdGVtcy1zaG93XCJcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjZjBmMGYwXCIsXG4gICAgICAgIHBhZGRpbmc6IFwiMXJlbVwiLFxuICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxoMz5BcnRpY29sZSDDrm4gb3JkaW5lOjwvaDM+XG4gICAgICB7aXRlbXNEYXRhLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgIGl0ZW1zRGF0YS5tYXAoKGl0ZW0sIGlkeCkgPT4gKFxuICAgICAgICAgIDxkaVxuICAgICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJvcmRlci1pdGVtXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIxcmVtXCIsXG4gICAgICAgICAgICAgIHBhZGRpbmc6IFwiMXJlbVwiLFxuICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkICNjY2NcIixcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgPHN0cm9uZz5OdW1lOjwvc3Ryb25nPiB7aXRlbS5wcm9kdWN0X25hbWV9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgPHN0cm9uZz5JRDo8L3N0cm9uZz4ge2l0ZW0ucHJvZHVjdF9pZH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICA8c3Ryb25nPkNhbnRpdGF0ZTo8L3N0cm9uZz4ge2l0ZW0ucXVhbnRpdHl9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgPHN0cm9uZz5QcmXFozo8L3N0cm9uZz4ge2l0ZW0ucHJpY2V9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaT5cbiAgICAgICAgKSlcbiAgICAgICkgOiAoXG4gICAgICAgIDxwPuKAlCBOdSBleGlzdMSDIHByb2R1c2Ugw65uIGNvbWFuZMSDIOKAlDwvcD5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBPcmRlckl0ZW1zU2hvdztcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IENvbXBvbmVudDAgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9lZGl0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQwID0gQ29tcG9uZW50MFxuaW1wb3J0IENvbXBvbmVudDEgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9saXN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQxID0gQ29tcG9uZW50MVxuaW1wb3J0IENvbXBvbmVudDIgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9zaG93J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQyID0gQ29tcG9uZW50MlxuaW1wb3J0IENvbXBvbmVudDMgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9lZGl0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQzID0gQ29tcG9uZW50M1xuaW1wb3J0IENvbXBvbmVudDQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9saXN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQ0ID0gQ29tcG9uZW50NFxuaW1wb3J0IENvbXBvbmVudDUgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9zaG93J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQ1ID0gQ29tcG9uZW50NVxuaW1wb3J0IENvbXBvbmVudDYgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9lZGl0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQ2ID0gQ29tcG9uZW50NlxuaW1wb3J0IENvbXBvbmVudDcgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9saXN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQ3ID0gQ29tcG9uZW50N1xuaW1wb3J0IENvbXBvbmVudDggZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9zaG93J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQ4ID0gQ29tcG9uZW50OFxuaW1wb3J0IENvbXBvbmVudDkgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9lZGl0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQ5ID0gQ29tcG9uZW50OVxuaW1wb3J0IENvbXBvbmVudDEwIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MTAgPSBDb21wb25lbnQxMFxuaW1wb3J0IENvbXBvbmVudDExIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvc2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MTEgPSBDb21wb25lbnQxMVxuaW1wb3J0IENvbXBvbmVudDEyIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZWRpdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MTIgPSBDb21wb25lbnQxMlxuaW1wb3J0IENvbXBvbmVudDEzIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MTMgPSBDb21wb25lbnQxM1xuaW1wb3J0IENvbXBvbmVudDE0IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvc2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MTQgPSBDb21wb25lbnQxNFxuaW1wb3J0IENvbXBvbmVudDE1IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvZWRpdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MTUgPSBDb21wb25lbnQxNVxuaW1wb3J0IENvbXBvbmVudDE2IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MTYgPSBDb21wb25lbnQxNlxuaW1wb3J0IENvbXBvbmVudDE3IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvc2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MTcgPSBDb21wb25lbnQxN1xuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9hZG1pbk9wdGlvbnMvY29tcG9uZW50cy9pbWFnZUFkZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRGFzaGJvYXJkID0gRGFzaGJvYXJkXG5pbXBvcnQgT3JkZXJJdGVtc1Nob3cgZnJvbSAnLi4vYWRtaW5PcHRpb25zL2NvbXBvbmVudHMvT3JkZXJJdGVtc1Nob3cnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLk9yZGVySXRlbXNTaG93ID0gT3JkZXJJdGVtc1Nob3ciXSwibmFtZXMiOlsiRWRpdCIsIl9yZWYiLCJwcm9wZXJ0eSIsInJlY29yZCIsIm9uQ2hhbmdlIiwicGFyYW1zIiwiY3VzdG9tIiwicGF0aCIsImZsYXQiLCJnZXQiLCJmaWxlUGF0aFByb3BlcnR5Iiwia2V5Iiwia2V5UHJvcGVydHkiLCJmaWxlIiwiZmlsZVByb3BlcnR5Iiwib3JpZ2luYWxLZXkiLCJzZXRPcmlnaW5hbEtleSIsInVzZVN0YXRlIiwiZmlsZXNUb1VwbG9hZCIsInNldEZpbGVzVG9VcGxvYWQiLCJ1c2VFZmZlY3QiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJvblVwbG9hZCIsImZpbGVzIiwiaGFuZGxlUmVtb3ZlIiwiaGFuZGxlTXVsdGlSZW1vdmUiLCJzaW5nbGVLZXkiLCJpbmRleCIsImluZGV4T2YiLCJmaWxlc1RvRGVsZXRlIiwiZmlsZXNUb0RlbGV0ZVByb3BlcnR5IiwibmV3UGF0aCIsIm1hcCIsImN1cnJlbnRQYXRoIiwiaSIsIm5ld1BhcmFtcyIsInNldCIsIl9vYmplY3RTcHJlYWQiLCJjb25zb2xlIiwibG9nIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJsYWJlbCIsIkRyb3Bab25lIiwibXVsdGlwbGUiLCJ2YWxpZGF0ZSIsIm1pbWVUeXBlcyIsIm1heFNpemUiLCJEcm9wWm9uZUl0ZW0iLCJmaWxlbmFtZSIsInNyYyIsIm9uUmVtb3ZlIiwiRnJhZ21lbnQiLCJBdWRpb01pbWVUeXBlcyIsIkltYWdlTWltZVR5cGVzIiwiU2luZ2xlRmlsZSIsInByb3BzIiwibmFtZSIsIm1pbWVUeXBlIiwid2lkdGgiLCJpbmNsdWRlcyIsInN0eWxlIiwibWF4SGVpZ2h0IiwibWF4V2lkdGgiLCJhbHQiLCJjb250cm9scyIsImtpbmQiLCJCb3giLCJCdXR0b24iLCJhcyIsImhyZWYiLCJtbCIsInNpemUiLCJyb3VuZGVkIiwidGFyZ2V0IiwiSWNvbiIsImljb24iLCJjb2xvciIsIm1yIiwiRmlsZSIsImZpbGVOYW1lUHJvcGVydHkiLCJtaW1lVHlwZVByb3BlcnR5Iiwib3B0cyIsImJhc2VVcmwiLCJjb25jYXQiLCJzaW5nbGVQYXRoIiwiTGlzdCIsIl9leHRlbmRzIiwiU2hvdyIsIlVwbG9hZFBob3RvIiwiYXBpIiwiQXBpQ2xpZW50IiwicmVzb3VyY2VBY3Rpb24iLCJyZXNvdXJjZUlkIiwiYWN0aW9uTmFtZSIsInRoZW4iLCJyZXN1bHRzIiwiY2xhc3NOYW1lIiwiT3JkZXJJdGVtc1Nob3ciLCJpdGVtc0RhdGEiLCJ1bmRlZmluZWQiLCJwdXNoIiwicHJvZHVjdF9pZCIsInByb2R1Y3RfbmFtZSIsInF1YW50aXR5IiwicHJpY2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwYWRkaW5nIiwiYm9yZGVyUmFkaXVzIiwiaXRlbSIsImlkeCIsIm1hcmdpbkJvdHRvbSIsImJvcmRlciIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyIsIkNvbXBvbmVudDAiLCJDb21wb25lbnQxIiwiQ29tcG9uZW50MiIsIkNvbXBvbmVudDMiLCJDb21wb25lbnQ0IiwiQ29tcG9uZW50NSIsIkNvbXBvbmVudDYiLCJDb21wb25lbnQ3IiwiQ29tcG9uZW50OCIsIkNvbXBvbmVudDkiLCJDb21wb25lbnQxMCIsIkNvbXBvbmVudDExIiwiQ29tcG9uZW50MTIiLCJDb21wb25lbnQxMyIsIkNvbXBvbmVudDE0IiwiQ29tcG9uZW50MTUiLCJDb21wb25lbnQxNiIsIkNvbXBvbmVudDE3IiwiRGFzaGJvYXJkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFLQSxNQUFNQSxJQUEyQixHQUFHQyxJQUFBLElBQW9DO0lBQUEsSUFBbkM7TUFBRUMsUUFBUTtNQUFFQyxNQUFNO0VBQUVDLElBQUFBLFFBQUFBO0VBQVMsR0FBQyxHQUFBSCxJQUFBLENBQUE7SUFDakUsTUFBTTtFQUFFSSxJQUFBQSxNQUFBQTtF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
